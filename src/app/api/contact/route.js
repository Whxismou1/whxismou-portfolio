import { NextResponse } from "next/server";
import { Resend } from "resend";
import  ContactEmail  from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    console.log(name, email, message)

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "mouhcinevalderas@gmail.com",
      subject: `🚀 New Portfolio Contact from ${name}`,
      react: <ContactEmail name={name} email={email} message={message} />,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
