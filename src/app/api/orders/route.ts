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
    }).sort({ createdAt: -1 }).lean();

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
      orderStatus: ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].includes(l.status) 
        ? l.status 
        : (l.status === "COMPLETED" ? "COMPLETED" : 
           l.status === "CLOSED" ? "CANCELLED" : 
           l.status === "NEW" ? "PENDING" : "CONFIRMED"),
      createdAt: l.createdAt,
      items: [{ name: l.service, price: l.price || 0, quantity: 1 }],
      isLegacy: true,
      assignedTechnician: l.technicianDetails || null
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

    const { sendEmail } = await import("@/lib/email/sendEmail");
    const { bookingTemplate, adminTemplate } = await import("@/lib/email/templates");

    try {
      if (order.email) {
        await sendEmail({
          to: order.email,
          subject: `Service Order Confirmed [${order.orderId}] - Local Pankaj ✅`,
          html: bookingTemplate({
            service: `${order.items?.[0]?.name || "Service"} (Order ID: ${order.orderId})`,
            date: order.date ? `${order.date} at ${order.time}` : "Reviewing Schedule",
            location: order.address || "Jaipur"
          })
        });
      }

      await sendEmail({
        to: process.env.ADMIN_EMAIL || "admin@localpankaj.com",
        subject: `New Order Generated - ${order.orderId} 📞`,
        html: adminTemplate({
          message: `New service order captured: <strong>${order.items?.[0]?.name || "Service Order"}</strong>`,
          details: `
            Order ID: <strong style="color: #2563eb;">${order.orderId}</strong><br>
            Name: <strong>${order.name}</strong><br>
            Email: <strong>${order.email || "N/A"}</strong><br>
            Phone: <strong>${order.phone}</strong><br>
            Service: <strong>${order.items?.map((i: any) => i.name).join(', ') || "Service"}</strong><br>
            Total Amount: <strong>₹${order.totalAmount}</strong><br>
            Booking Date: <strong>${order.date} (${order.time})</strong><br>
            Address: <strong>${order.address}, ${order.city}, ${order.state} - ${order.pincode}</strong><br>
            Payment Method: <strong style="color: #10b981;">${order.paymentMethod === "PAY_ON_VISIT" ? "Pay on Visit" : "Paid Online"}</strong>
          `
        })
      });
    } catch (emailError) {
      console.error("Order confirmation email failure:", emailError);
    }

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
