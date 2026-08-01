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
  width: 1440,
  height: 900,
},
    });

    const url = `${request.nextUrl.origin}/agreement-print/${id}`;

    console.log("Opening:", url);

    await page.goto(url,{
    waitUntil:"networkidle",
    timeout:60000
});

await page.emulateMedia({
    media:"print"
});

await page.evaluate(async()=>{
    await document.fonts.ready;
});

await page.evaluate(() =>
    new Promise(resolve =>
        requestAnimationFrame(() => resolve(true))
    )
);

await page.waitForTimeout(300);

const pdfBuffer = await page.pdf({
    format:"A4",
    printBackground:true,
    preferCSSPageSize:true,
    displayHeaderFooter:false,
    margin:{
        top:"12mm",
        right:"12mm",
        bottom:"12mm",
        left:"12mm",
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
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      }
    );
  }
}