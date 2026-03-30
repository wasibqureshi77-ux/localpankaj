import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Otp from "@/models/Otp";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { phone, otp, name, email } = await req.json();
    if (!phone || !otp) return NextResponse.json({ error: "Phone and OTP required" }, { status: 400 });

    await connectDB();

    // Verify OTP
    const record = await Otp.findOne({ phone, otp });
    if (!record) return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    if (record.expiresAt < new Date()) {
      return NextResponse.json({ error: "OTP Expired" }, { status: 410 });
    }

    // Success - Mark verified
    await Otp.findByIdAndUpdate(record._id, { verified: true });

    // Check if user exists
    let user = await User.findOne({ phone });
    
    // If we have an email but not a user, potentially link?
    if (!user && email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      // Create user automatically
      const autoPass = Math.random().toString(36).slice(-10);
      const hashedPassword = await bcrypt.hash(autoPass, 10);
      
      user = await User.create({
        name: name || "Member",
        phone,
        email: email || `${phone}@localpankaj.com`, // Fallback email
        password: hashedPassword,
        role: "USER"
      });
    }

    return NextResponse.json({ 
       message: "Verified Successfully", 
       user: { id: user._id, name: user.name, email: user.email, phone: user.phone } 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
