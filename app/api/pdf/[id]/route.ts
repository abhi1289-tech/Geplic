import { NextRequest, NextResponse } from "next/server";
import { chromium as playwright, type Browser, type Page } from "playwright-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";
export const maxDuration = 60;

// Share one in-flight launch promise across concurrent requests in this
// Node/serverless instance. Assign the promise before awaiting executablePath()
// so two simultaneous requests cannot both attempt to launch Chromium.
let browserPromise: Promise<Browser> | null = null;
let browserReady = false;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isTextBusyError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "message" in error &&
    String((error as { message?: unknown }).message ?? "").includes("ETXTBSY")
  );
}

async function launchBrowser(isVercel: boolean): Promise<Browser> {
  const options = isVercel
    ? {
        headless: true,
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      }
    : {
        headless: true,
        channel: "chrome",
      };

  try {
    return await playwright.launch(options);
  } catch (error) {
    // ETXTBSY can be transient when the runtime is preparing/using the
    // executable. Retry once, with a short delay; do not retry other errors.
    if (!isTextBusyError(error)) throw error;
    console.warn("Chromium launch returned ETXTBSY; retrying once.");
    await delay(250);
    return await playwright.launch(options);
  }
}

type BrowserAcquisition = {
  browser: Browser;
  mode: "existing-browser" | "shared-launch" | "new-launch";
};

async function getBrowser(isVercel: boolean): Promise<BrowserAcquisition> {
  const pendingOrExisting = browserPromise;
  if (pendingOrExisting) {
    // A resolved browser can be recognized synchronously by this flag, while
    // callers arriving during launch are recorded as sharing that launch.
    const launchWasAlreadyInFlight = browserReady !== true;
    try {
      const existing = await pendingOrExisting;
      if (existing.isConnected()) {
        return {
          browser: existing,
          mode: launchWasAlreadyInFlight ? "shared-launch" : "existing-browser",
        };
      }
    } catch {
      // If another request has installed a replacement promise, retry against
      // it instead of starting a competing Chromium launch.
      if (browserPromise !== pendingOrExisting) {
        return getBrowser(isVercel);
      }
    }
    if (browserPromise === pendingOrExisting) {
      browserPromise = null;
      browserReady = false;
    }
  }

  // Store the promise synchronously so concurrent calls share one launch.
  const launchPromise = launchBrowser(isVercel);
  browserPromise = launchPromise;

  try {
    const launched = await launchPromise;
    if (browserPromise === launchPromise) browserReady = true;
    return { browser: launched, mode: "new-launch" };
  } catch (error) {
    if (browserPromise === launchPromise) {
      browserPromise = null;
      browserReady = false;
    }
    throw error;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const startedAt = Date.now();
  const timings: Record<string, number> = {};
  let browser: Browser | undefined;
  let browserAcquisitionMode: BrowserAcquisition["mode"] | undefined;
  let page: Page | undefined;

  try {
    const isVercel = !!process.env.VERCEL;
    const launchStartedAt = Date.now();
    const browserAcquisition = await getBrowser(isVercel);
    browser = browserAcquisition.browser;
    browserAcquisitionMode = browserAcquisition.mode;
    timings.browserAcquireMs = Date.now() - launchStartedAt;

    const pageStartedAt = Date.now();
    page = await browser.newPage({
      viewport: { width: 794, height: 1123 },
      deviceScaleFactor: 1,
    });
    timings.pageCreateMs = Date.now() - pageStartedAt;

    const url = new URL(
      `/agreement-print/${encodeURIComponent(id)}`,
      request.nextUrl.origin
    ).toString();
    const navigationStartedAt = Date.now();

    // DOMContentLoaded avoids waiting for unrelated requests. Navigation time
    // includes print-route server work (including agreement data retrieval) and
    // the initial page render; the readiness stage below measures the remainder.
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    timings.navigationMs = Date.now() - navigationStartedAt;

    if (!response || !response.ok()) {
      throw new Error(
        `Agreement print page failed to load (${response?.status() ?? "no response"}).`
      );
    }

    const contentStartedAt = Date.now();
    await page.locator(".agreement-document").waitFor({
      state: "visible",
      timeout: 15000,
    });

    await page.emulateMedia({ media: "print" });
    await page.evaluate(async () => {
      if ("fonts" in document) await document.fonts.ready;
    });
    timings.documentReadyMs = Date.now() - contentStartedAt;

    const pdfStartedAt = Date.now();
    const pdfBuffer = await page.pdf({
      format: "A4",
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: false,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    timings.pdfRenderMs = Date.now() - pdfStartedAt;
    timings.pdfBytes = pdfBuffer.byteLength;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="agreement-${id}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    timings.totalMs = Date.now() - startedAt;
    console.info("PDF generation timings", {
      pactId: id,
      browserAcquisitionMode,
      isWarmBrowserReuse: browserAcquisitionMode === "existing-browser",
      ...timings,
    });

    // Close the per-request page, not the shared Chromium process. This lets
    // subsequent downloads reuse Chromium while keeping page state isolated.
    if (page) {
      try {
        await page.close();
      } catch (closeError) {
        console.error("Failed to close PDF page:", closeError);
      }
    }
  }
}
