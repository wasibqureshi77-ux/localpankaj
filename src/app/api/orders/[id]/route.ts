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

    let updateBody = { ...body };
    if (updateBody.assignedTechnician && !updateBody.orderStatus) {
      updateBody.orderStatus = "ASSIGNED";
    }

    // Check if it's a new Order or a legacy Lead
    const order = await Order.findByIdAndUpdate(id, updateBody, { new: true });
    
    if (order) {
       // 1. TECHNICIAN ASSIGNMENT LOGIC for Orders
       if (body.assignedTechnician) {
          const { Appointment } = await import("@/models/Appointment");
          const { User } = await import("@/models/User");
          const { sendEmail } = await import("@/lib/email/sendEmail");

          const technician = body.assignedTechnician.id.startsWith("MANUAL-") ? null : await User.findById(body.assignedTechnician.id);
          
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
                            <p><strong>Payment Status:</strong> ${order.paymentMethod === 'ONLINE' ? '<span style="color: #10b981;">Payment Collected</span>' : '<span style="color: #ef4444; font-weight: bold;">Collect Cash on Visit</span>'}</p>
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
      
      if (updateBody.orderStatus) updateData.status = updateBody.orderStatus;
      if (body.assignedTechnician) {
         updateData.technicianDetails = body.assignedTechnician;
      }

      const lead = await Lead.findByIdAndUpdate(id, updateData, { new: true, strict: false });
      
      if (!lead) {
        return NextResponse.json({ error: "Reference not found" }, { status: 404 });
      }
      
      // TECHNICIAN ASSIGNMENT LOGIC for Legacy Leads
      if (body.assignedTechnician) {
         const { User } = await import("@/models/User");
         const { sendEmail } = await import("@/lib/email/sendEmail");

         const technician = body.assignedTechnician.id.startsWith("MANUAL-") ? null : await User.findById(body.assignedTechnician.id);
         
         if (technician) {
            try {
               // To Technician
               await sendEmail({
                  to: technician.email,
                  subject: `New Order Assigned: ${lead.service || 'Service'} 🛠️`,
                  html: `
                     <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
                        <h2 style="color: #2563eb;">New Assignment Received</h2>
                        <p>Hello <strong>${technician.name}</strong>, a new service order has been assigned to you.</p>
                        <div style="background: #f8fafc; padding: 20px; border-radius: 15px; margin: 20px 0;">
                           <p><strong>Customer:</strong> ${lead.name}</p>
                           <p><strong>Service:</strong> ${lead.service || 'Professional Service'}</p>
                           <p><strong>Contact:</strong> ${lead.phone}</p>
                           <p><strong>Address:</strong> ${lead.address || 'Address not provided'}</p>
                           <p><strong>Schedule:</strong> ${lead.bookingDate || ''} at ${lead.bookingTime || ''}</p>
                           <p><strong>Payment Status:</strong> ${lead.paymentMethod === 'ONLINE' ? '<span style="color: #10b981;">Payment Collected</span>' : '<span style="color: #ef4444; font-weight: bold;">Collect Cash on Visit</span>'}</p>
                        </div>
                        <p>Please log in to your portal to start the job.</p>
                     </div>
                  `
               });

               // To User
               if (lead.email) {
                  await sendEmail({
                     to: lead.email,
                     subject: "Your Service Expert is Assigned! 👨‍🔧",
                     html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
                           <h2 style="color: #2563eb;">Specialist Assigned</h2>
                           <p>Hi <strong>${lead.name}</strong>, we have assigned an expert for your service.</p>
                           <div style="background: #f8fafc; padding: 20px; border-radius: 15px; margin: 20px 0;">
                              <p><strong>Expert Name:</strong> ${technician.name}</p>
                              <p><strong>Contact:</strong> ${technician.phone}</p>
                           </div>
                           <p>The expert will reach your location as per the scheduled time.</p>
                        </div>
                     `
                  });
               }
            } catch (mailErr) {
               console.error("Order assignment email failure:", mailErr);
            }
         }
      }
      
      return NextResponse.json({ message: "Legacy Lead updated successfully" });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
