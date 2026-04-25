import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Lead } from "@/models/Lead";
import { User } from "@/models/User";
import { Counter } from "@/models/Counter";
import { getServerSession } from "next-auth";

// GET - List all orders (Admin only)
export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    // 1. Fetch from new Order collection
    const mainOrders = await Order.find({}).sort({ createdAt: -1 }).populate({
      path: "user",
      model: User,
      select: "name email role shadow:true"
    });

    // 2. Fetch legacy checkouts from Lead collection
    const legacyOrders = await Lead.find({ 
      $or: [
        { source: "ORDER" },
        { paymentMethod: { $exists: true } }
      ]
    }).sort({ createdAt: -1 });

    // Merged results for admin view
    const formattedLegacy = legacyOrders.map((l: any) => ({
      _id: l._id,
      orderId: l.requestId || `LEG-${l._id.toString().slice(-6)}`,
      name: l.name,
      phone: l.phone,
      email: l.email,
      totalAmount: l.price || 0,
      paymentMethod: l.paymentMethod || "PAY_ON_VISIT",
      paymentStatus: l.paymentStatus || "PENDING",
      orderStatus: l.status === "COMPLETED" ? "COMPLETED" : "CONFIRMED",
      createdAt: l.createdAt,
      items: [{ name: l.service, price: l.price || 0, quantity: 1 }],
      isLegacy: true
    }));

    const allOrders = [...mainOrders, ...formattedLegacy].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(allOrders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create order (from checkout)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectDB();

    console.log("Creating order with data:", JSON.stringify(data, null, 2));

    // Generate Sequential Order ID starting from 1001
    const counter = await Counter.findOneAndUpdate(
      { id: "orderId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    let currentSeq = counter.seq;
    if (currentSeq < 1001) {
      const updated = await Counter.findOneAndUpdate(
        { id: "orderId" },
        { $set: { seq: 1001 } },
        { new: true }
      );
      currentSeq = updated.seq;
    }

    const orderId = currentSeq.toString();

    const order = await Order.create({
      ...data,
      orderId,
    });

    console.log("Order created successfully:", order.orderId);

    return NextResponse.json({ 
      success: true, 
      message: "Order placed successfully", 
      order 
    });
  } catch (error: any) {
    console.error("Order creation failed detailing:", {
      message: error.message,
      name: error.name,
      errors: error.errors
    });
    return NextResponse.json({ error: error.message, details: error.errors }, { status: 500 });
  }
}
