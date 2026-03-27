import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, role } = await req.json();

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "USER",
    });

    // Trigger Transactional Emails
    try {
      const { sendEmail } = await import("@/lib/email/sendEmail");
      const { userWelcomeTemplate, adminTemplate } = await import("@/lib/email/templates");

      // To User
      await sendEmail({
        to: email,
        subject: "Welcome to Local Pankaj 🚀",
        html: userWelcomeTemplate(name)
      });

      // To Admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL || "admin@localpankaj.com",
        subject: "New Identity Registration Alert",
        html: adminTemplate({ 
          message: `New identity registered: <strong>${name}</strong> (${email})`,
          details: `Role: <strong>${role || "USER"}</strong><br>Contact: <strong>${phone || "N/A"}</strong>`
        })
      });
    } catch (emailError) {
      console.error("Non-critical email failure:", emailError);
    }

    return NextResponse.json(
      { message: "User registered successfully", user: { id: newUser._id, name: newUser.name, role: newUser.role } },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
