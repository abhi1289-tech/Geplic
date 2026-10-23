import { NextRequest, NextResponse } from "next/server";
import { chromium as playwright, type Browser, type Page } from "playwright-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";
export const maxDuration = 60;

// Keep individual stages bounded so a stuck operation returns a useful error
// before Vercel terminates the entire function at 60 seconds.
const BROWSER_LAUNCH_TIMEOUT_MS = 25000;
const NAVIGATION_TIMEOUT_MS = 20000;
const DOCUMENT_READY_TIMEOUT_MS = 10000;
const PDF_RENDER_TIMEOUT_MS = 15000;
const PAGE_CLOSE_TIMEOUT_MS = 2000;
const PDF_ROUTE_BUILD = "pdf-reliability-diagnostic-2026-10-24-r1";

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

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (value) => { clearTimeout(timer); resolve(value); },
      (error) => { clearTimeout(timer); reject(error); },
    );
  });
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

  const launch = async () => {
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
  };

  const launchPromise = launch();
  try {
    return await withTimeout(launchPromise, BROWSER_LAUNCH_TIMEOUT_MS, "Chromium launch");
  } catch (error) {
    // If the timeout wins but Chromium subsequently launches, close the late
    // browser rather than leaving an orphan process behind.
    if (error instanceof Error && error.message.includes("timed out")) {
      void launchPromise.then((lateBrowser) => lateBrowser.close().catch(() => undefined)).catch(() => undefined);
    }
    throw error;
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
  const startedAt = Date.now();
  const timings: Record<string, number> = {};
  let id = "unknown";
  let stage = "request-entry";
  let browser: Browser | undefined;
  let browserAcquisitionMode: BrowserAcquisition["mode"] | undefined;
  let page: Page | undefined;
  const requestTrace = request.headers.get("x-vercel-id") ?? request.headers.get("x-request-id") ?? "unavailable";

  // This marker proves which deployed route version handled the request.
  console.info("PDF route entered", { build: PDF_ROUTE_BUILD, requestTrace, startedAt });

  try {
    stage = "route-params";
    const resolvedParams = await withTimeout(params, 3000, "Route params");
    id = resolvedParams.id;
    console.info("PDF stage completed", { pactId: id, stage, requestTrace });
    const isVercel = !!process.env.VERCEL;
    stage = "browser-acquisition";
    console.info("PDF stage started", { pactId: id, stage, requestTrace, build: PDF_ROUTE_BUILD });
    const launchStartedAt = Date.now();
    const browserAcquisition = await getBrowser(isVercel);
    browser = browserAcquisition.browser;
    browserAcquisitionMode = browserAcquisition.mode;
    timings.browserAcquireMs = Date.now() - launchStartedAt;
    console.info("PDF stage completed", { pactId: id, stage, requestTrace, build: PDF_ROUTE_BUILD, durationMs: timings.browserAcquireMs, browserAcquisitionMode });

    stage = "page-create";
    console.info("PDF stage started", { pactId: id, stage, requestTrace, build: PDF_ROUTE_BUILD });
    const pageStartedAt = Date.now();
    page = await browser.newPage({
      viewport: { width: 794, height: 1123 },
      deviceScaleFactor: 1,
    });
    timings.pageCreateMs = Date.now() - pageStartedAt;
    console.info("PDF stage completed", { pactId: id, stage, requestTrace, build: PDF_ROUTE_BUILD, durationMs: timings.pageCreateMs });

    stage = "print-page-navigation";
    console.info("PDF stage started", { pactId: id, stage, requestTrace, build: PDF_ROUTE_BUILD });
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
      timeout: NAVIGATION_TIMEOUT_MS,
    });
    timings.navigationMs = Date.now() - navigationStartedAt;
    console.info("PDF stage completed", { pactId: id, stage, requestTrace, build: PDF_ROUTE_BUILD, durationMs: timings.navigationMs, httpStatus: response?.status() });

    if (!response || !response.ok()) {
      throw new Error(
        `Agreement print page failed to load (${response?.status() ?? "no response"}).`
      );
    }

    stage = "document-readiness";
    console.info("PDF stage started", { pactId: id, stage, requestTrace, build: PDF_ROUTE_BUILD });
    const contentStartedAt = Date.now();
    await page.locator(".agreement-document").waitFor({
      state: "visible",
      timeout: DOCUMENT_READY_TIMEOUT_MS,
    });

    await page.emulateMedia({ media: "print" });
    await withTimeout(page.evaluate(async () => {
      if ("fonts" in document) await document.fonts.ready;
    }), 3000, "Print fonts readiness");
    timings.documentReadyMs = Date.now() - contentStartedAt;
    console.info("PDF stage completed", { pactId: id, stage, requestTrace, build: PDF_ROUTE_BUILD, durationMs: timings.documentReadyMs });

    stage = "pdf-render";
    console.info("PDF stage started", { pactId: id, stage, requestTrace, build: PDF_ROUTE_BUILD });
    const pdfStartedAt = Date.now();
    const pdfBuffer = await withTimeout(page.pdf({
      format: "A4",
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: false,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    }), PDF_RENDER_TIMEOUT_MS, "PDF render");
    timings.pdfRenderMs = Date.now() - pdfStartedAt;
    timings.pdfBytes = pdfBuffer.byteLength;
    console.info("PDF stage completed", { pactId: id, stage, requestTrace, build: PDF_ROUTE_BUILD, durationMs: timings.pdfRenderMs, pdfBytes: timings.pdfBytes });

    stage = "response";
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="agreement-${id}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF Generation Error", {
      pactId: id,
      requestTrace,
      build: PDF_ROUTE_BUILD,
      failedStage: stage,
      elapsedMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      {
        success: false,
        stage,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    timings.totalMs = Date.now() - startedAt;
    console.info("PDF generation timings", {
      pactId: id,
      requestTrace,
      build: PDF_ROUTE_BUILD,
      finalStage: stage,
      browserAcquisitionMode,
      isWarmBrowserReuse: browserAcquisitionMode === "existing-browser",
      ...timings,
    });

    // Close the per-request page, not the shared Chromium process. This lets
    // subsequent downloads reuse Chromium while keeping page state isolated.
    if (page) {
      const cleanupStartedAt = Date.now();
      try {
        await withTimeout(page.close(), PAGE_CLOSE_TIMEOUT_MS, "Page cleanup");
        console.info("PDF cleanup completed", {
          pactId: id,
          requestTrace,
          build: PDF_ROUTE_BUILD,
          durationMs: Date.now() - cleanupStartedAt,
        });
      } catch (closeError) {
        console.error("PDF cleanup failed", {
          pactId: id,
          requestTrace,
          build: PDF_ROUTE_BUILD,
          durationMs: Date.now() - cleanupStartedAt,
          error: closeError instanceof Error ? closeError.message : String(closeError),
        });
        // Closing a page should not hold the function open indefinitely.
        void page.close().catch(() => undefined);
      }
    }
  }
}
