import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

// ✅ EMAIL SETUP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ GET (to avoid 405)
export async function GET() {
  await connectDB();

  const leads = await Contact.find().sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    data: leads,
  });
}

// ✅ POST
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // 🔥 Generate tracking ID
    const trackingId = Math.random().toString(36).substring(2, 10);

    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      subject: body.subject,
      message: body.message,
      trackingId,
    });

    // ✉️ SEND EMAIL
    if (body.email) {
      await transporter.sendMail({
        to: body.email,
        subject: "Application Submitted Successfully",
        text: `
Hi ${body.name},

Your application has been submitted.

Tracking ID: ${trackingId}

- Zwiebel AI Team
        `,
      });
    }

    return NextResponse.json({
      success: true,
      trackingId,
      data: contact,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json({
      success: false,
      error: "Something went wrong",
    });
  }
}