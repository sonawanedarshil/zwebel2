import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import twilio from "twilio";

// ✅ YOUR TWILIO CREDENTIALS
const accountSid = process.env.TWILIO_SID!;
const authToken = process.env.TWILIO_AUTH!;
const client = twilio(accountSid, authToken);

// ✅ Twilio Sandbox WhatsApp number
const FROM_WHATSAPP = "whatsapp:+14155238886";

export async function POST(req: Request) {

  try {

    await connectDB();

    const body = await req.json();

    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      subject: body.subject,
      message: body.message
    });

    // ✅ SEND WHATSAPP MESSAGE TO USER
    if (body.phone) {
      await client.messages.create({
        from: FROM_WHATSAPP,
        to: `whatsapp:+91${body.phone}`, // user number
        body: `Hi ${body.name} 👋

We have received your application.

Our team will get back to you soon.

- Zwiebel AI Team`
      });
    }

    return NextResponse.json({
      success: true,
      data: contact
    });

  } catch (error) {

    console.error("API ERROR:", error);

    return NextResponse.json({
      success: false,
      error: "Something went wrong"
    });

  }

}