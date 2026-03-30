import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Otp from "@/models/Otp";
import { sendSms } from "@/lib/sms";

export async function POST(req: Request) {
  try {
    let { phone } = await req.json();
    if (!phone) return NextResponse.json({ error: "Missing phone" }, { status: 400 });

    // Clean phone: digits only and keep last 10
    phone = phone.replace(/\D/g, "").slice(-10);
    
    if (phone.length !== 10) {
       return NextResponse.json({ error: "Invalid 10-digit phone number" }, { status: 400 });
    }

    await connectDB();

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // Save/Update OTP record
    await Otp.findOneAndUpdate(
      { phone },
      { otp: code, expiresAt, verified: false },
      { upsert: true, returnDocument: 'after' }
    );

    // Send SMS 
    const res = await sendSms(phone, `Your Local Pankaj verification code is: ${code}`);

    if (res.success) {
      return NextResponse.json({ message: "OTP Sent Successfully" });
    } else {
      // Return specific error for troubleshooting
      return NextResponse.json({ 
        error: "SMS sending failed", 
        details: (res as any).error || (res as any).data?.message || "Unknown Provider Error" 
      }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
