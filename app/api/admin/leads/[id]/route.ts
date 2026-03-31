import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

// ✅ EMAIL SETUP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ GET ONE LEAD
export async function GET(req: Request, { params }: any) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const lead = await Contact.findById(params.id);

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: lead,
    });

  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE LEAD + EMAIL
export async function PATCH(req: Request, { params }: any) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updated = await Contact.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    // 🔥 PAYMENT CALCULATIONS
    const total = updated.totalAmount || 0;
    const paid = updated.paidAmount || 0;
    const pending = total - paid;

    let paymentStatus = "pending";
    if (paid > 0 && paid < total) paymentStatus = "partial";
    if (paid >= total && total > 0) paymentStatus = "completed";

    // 🔥 SEND EMAIL
    try {
      if (updated.email) {
        await transporter.sendMail({
          to: updated.email,
          subject: "Application Status Updated",
          text: `
Hi ${updated.name},

Your application has been updated.

📌 Status: ${updated.status}
⚡ Priority: ${updated.priority}

💻 Development: ${
            updated.developmentStarted ? "Started" : "Not Started"
          }

💰 Total: ₹${total}
✅ Paid: ₹${paid}
⏳ Pending: ₹${pending}
📊 Payment Status: ${paymentStatus}

🆔 Tracking ID: ${updated.trackingId || "N/A"}

You can track your application anytime.

- Zwiebel AI Team
          `,
        });
      }
    } catch (mailError) {
      console.error("EMAIL ERROR:", mailError);
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });

  } catch (error) {
    console.error("PATCH ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE LEAD
export async function DELETE(req: Request, { params }: any) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const deleted = await Contact.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}