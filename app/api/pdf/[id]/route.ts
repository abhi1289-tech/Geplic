import { NextRequest, NextResponse } from "next/server";
import { chromium as playwright } from "playwright-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let browser;

  try {
    const isVercel = !!process.env.VERCEL;

    browser = await playwright.launch(
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

    const page = await browser.newPage({
      viewport: {
        width: 794,
        height: 1123,
      },
      deviceScaleFactor: 1,
    });

    const url = `${request.nextUrl.origin}/agreement-print/${id}`;

    console.log("Opening PDF source:", url);

    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    /*
     * PDF rendering uses print media so that the dedicated
     * agreement print rules are applied.
     */
    await page.emulateMedia({
      media: "print",
    });

    /*
     * Wait for fonts and layout to settle before generating
     * the document.
     */
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => resolve());
        })
    );

    await page.waitForTimeout(300);

    const pdfBuffer = await page.pdf({
      format: "A4",

      /*
       * The print CSS owns the page size and margins.
       */
      preferCSSPageSize: true,

      /*
       * Preserve the agreement's light green document
       * surfaces and other backgrounds.
       */
      printBackground: true,

      displayHeaderFooter: false,

      /*
       * Do not add another 12mm browser margin here.
       * The document CSS controls the printable area.
       */
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    await browser.close();

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=agreement-${id}.pdf`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);

    if (browser) {
      await browser.close();
    }

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}