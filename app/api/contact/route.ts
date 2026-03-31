import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // 🔥 NEW (STEP 2)
    const trackingId = Math.random().toString(36).substring(2, 10);
    const clientId = "C-" + Math.floor(1000 + Math.random() * 9000);

    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      subject: body.subject,
      message: body.message,
      trackingId,

      clientId, // 🔥 NEW FIELD ADDED
    });

    if (body.email) {
      await transporter.sendMail({
        to: body.email,
        subject: "Application Submitted",
        text: `
Hi ${body.name},

Tracking ID: ${trackingId}
Client ID: ${clientId}

Your application is received.

- Zwiebel AI
        `,
      });
    }

    return NextResponse.json({
      success: true,
      trackingId,
      clientId, // 🔥 OPTIONAL RETURN
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json({
      success: false,
      error: "Something went wrong",
    });
  }
}