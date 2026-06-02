import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { email, pactId, sender } = body;

    const link = `${process.env.NEXT_PUBLIC_APP_URL}/pact/${pactId}`;

    await resend.emails.send({
      from: "TruPact <onboarding@resend.dev>",
      to: email,
      subject: "You received an agreement on TruPact",
      html: `
        <h2>You received an agreement</h2>

        <p>${sender} sent you an agreement on TruPact.</p>

        <p>
          <a href="${link}">
            Review Agreement
          </a>
        </p>
      `
    });

    return NextResponse.json({ success: true });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );

  }

}