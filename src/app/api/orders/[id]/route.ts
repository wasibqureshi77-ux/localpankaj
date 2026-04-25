import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Lead } from "@/models/Lead";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = await params;

    // Check if it's a new Order or a legacy Lead
    const order = await Order.findByIdAndUpdate(id, body, { new: true });
    
    if (order) {
       // 1. TECHNICIAN ASSIGNMENT LOGIC for Orders
       if (body.assignedTechnician) {
          const { Appointment } = await import("@/models/Appointment");
          const { User } = await import("@/models/User");
          const { sendEmail } = await import("@/lib/email/sendEmail");

          const technician = await User.findById(body.assignedTechnician);
          
          if (technician) {
             // Update or Create Appointment for Order
             await Appointment.findOneAndUpdate(
                { orderId: id },
                { 
                  technicianId: technician._id, 
                  status: "ASSIGNED",
                  date: order.date ? new Date(order.date) : new Date()
                },
                { upsert: true, new: true }
             );

             // Notifications
             try {
                // To Technician
                await sendEmail({
                   to: technician.email,
                   subject: `New Order Assigned: ${order.items?.[0]?.name || 'Service'} 🛠️`,
                   html: `
                      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
                         <h2 style="color: #2563eb;">New Assignment Received</h2>
                         <p>Hello <strong>${technician.name}</strong>, a new service order has been assigned to you.</p>
                         <div style="background: #f8fafc; padding: 20px; border-radius: 15px; margin: 20px 0;">
                            <p><strong>Customer:</strong> ${order.name}</p>
                            <p><strong>Service:</strong> ${order.items?.[0]?.name || 'Professional Service'}</p>
                            <p><strong>Contact:</strong> ${order.phone}</p>
                            <p><strong>Address:</strong> ${order.address}</p>
                            <p><strong>Schedule:</strong> ${order.date} at ${order.time}</p>
                         </div>
                         <p>Please log in to your portal to start the job.</p>
                      </div>
                   `
                });

                // To User
                await sendEmail({
                   to: order.email,
                   subject: "Your Service Expert is Assigned! 👨‍🔧",
                   html: `
                      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
                         <h2 style="color: #2563eb;">Specialist Assigned</h2>
                         <p>Hi <strong>${order.name}</strong>, we have assigned an expert for your service.</p>
                         <div style="background: #f8fafc; padding: 20px; border-radius: 15px; margin: 20px 0;">
                            <p><strong>Expert Name:</strong> ${technician.name}</p>
                            <p><strong>Contact:</strong> ${technician.phone}</p>
                         </div>
                         <p>The expert will reach your location as per the scheduled time.</p>
                      </div>
                   `
                });
             } catch (mailErr) {
                console.error("Order assignment email failure:", mailErr);
             }
          }
       }
       return NextResponse.json(order);
    }

    if (!order) {
      // If not in Orders, it might be a legacy Lead being treated as an Order
      // We map status and potentially technician info back to Lead schema
      const updateData: any = {};
      
      if (body.orderStatus) updateData.status = body.orderStatus;
      if (body.assignedTechnician) {
         // Lead model doesn't have assignedTechnician natively, we store in notes or ignore for now
         // Actually let's assume Super Admin only manages new Orders correctly
         // But for legacy compatibility, we just update what we can
      }

      const lead = await Lead.findByIdAndUpdate(id, updateData, { new: true });
      
      if (!lead) {
        return NextResponse.json({ error: "Reference not found" }, { status: 404 });
      }
      
      return NextResponse.json({ message: "Legacy Lead updated successfully" });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
