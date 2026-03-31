import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR", receipt } = await req.json();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
       return NextResponse.json({ error: "Razorpay keys are not configured" }, { status: 500 });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay order error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
