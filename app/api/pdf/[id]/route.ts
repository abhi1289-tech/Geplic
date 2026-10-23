import { NextRequest, NextResponse } from "next/server";
import { chromium as playwright, type Browser, type Page } from "playwright-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";
export const maxDuration = 60;

// Reuse Chromium in warm Node/serverless instances. Launching a fresh Chromium
// process for every download is expensive; each request still gets its own page.
let browserPromise: Promise<Browser> | null = null;

async function getBrowser(isVercel: boolean): Promise<Browser> {
  if (browserPromise) {
    try {
      const existing = await browserPromise;
      if (existing.isConnected()) return existing;
    } catch {
      // A previous launch failed; clear it and retry below.
    }
    browserPromise = null;
  }

  browserPromise = playwright.launch(
    isVercel
      ? {
          headless: true,
          args: chromium.args,
          executablePath: await chromium.executablePath(),
        }
      : {
          headless: true,
          channel: "chrome",
        }
  );

  try {
    return await browserPromise;
  } catch (error) {
    browserPromise = null;
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
