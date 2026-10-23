import { NextRequest, NextResponse } from "next/server";
import { chromium as playwright, type Browser, type Page } from "playwright-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";
export const maxDuration = 60;

// Share one in-flight launch promise across concurrent requests in this
// Node/serverless instance. Assign the promise before awaiting executablePath()
// so two simultaneous requests cannot both attempt to launch Chromium.
let browserPromise: Promise<Browser> | null = null;

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

async function getBrowser(isVercel: boolean): Promise<Browser> {
  if (browserPromise) {
    const pendingOrExisting = browserPromise;
    try {
      const existing = await pendingOrExisting;
      if (existing.isConnected()) return existing;
    } catch {
      // If another request has already installed a replacement promise,
      // await that promise instead of starting a competing launch.
      if (browserPromise !== pendingOrExisting) {
        return getBrowser(isVercel);
      }
    }
    if (browserPromise === pendingOrExisting) browserPromise = null;
  }

  // Important: create and store the promise synchronously before its async
  // body can finish. Concurrent calls will await this same launch.
  const launchPromise = launchBrowser(isVercel);
  browserPromise = launchPromise;

  try {
    return await launchPromise;
  } catch (error) {
    if (browserPromise === launchPromise) browserPromise = null;
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
  let page: Page | undefined;

  try {
    const isVercel = !!process.env.VERCEL;
    const launchStartedAt = Date.now();
    browser = await getBrowser(isVercel);
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
      isWarmBrowserReuse: timings.browserAcquireMs !== undefined && timings.browserAcquireMs < 1000,
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
