import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR", receipt } = await req.json();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
       return NextResponse.json({ error: "Razorpay keys are not configured" }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
    };

    if (options.amount < 100) {
      return NextResponse.json({ error: "Amount must be at least INR 1.00 (100 paise)" }, { status: 400 });
    }

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay order error:", error);
    
    // Handle Razorpay auth failures
    if (error.statusCode === 401) {
      return NextResponse.json({ error: "Razorpay authentication failed" }, { status: 401 });
    }
    
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 });
  }
}
