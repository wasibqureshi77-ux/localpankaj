import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";
import { Lead } from "@/models/Lead";
import { Order } from "@/models/Order";

export async function GET() {
  await connectDB();
  
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "TECHNICIAN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {

    // Find appointments assigned to this technician
    // Populate both leadId and orderId
    const appointments = await Appointment.find({ technicianId: session.user.id })
      .populate({
        path: "leadId",
        model: Lead,
        select: "name phone email service address bookingDate bookingTime category price paymentMethod paymentStatus notes",
        options: { strictPopulate: false }
      })
      .populate({
        path: "orderId",
        model: Order,
        select: "name phone email items address date time totalAmount paymentMethod paymentStatus",
        options: { strictPopulate: false }
      })
      .sort({ createdAt: -1 });

    // Unify the response so frontend sees a consistent "leadId" object
    const unifiedAppointments = appointments.map((appt: any) => {
      const apptObj = appt.toObject();
      
      // If it's an Order, map its fields to the Lead-like structure
      if (apptObj.orderId) {
        apptObj.leadId = {
          name: apptObj.orderId.name,
          phone: apptObj.orderId.phone,
          email: apptObj.orderId.email,
          service: apptObj.orderId.items?.[0]?.name || "Professional Service",
          address: apptObj.orderId.address,
          bookingDate: apptObj.orderId.date,
          bookingTime: apptObj.orderId.time,
          price: apptObj.orderId.totalAmount,
          paymentMethod: apptObj.orderId.paymentMethod,
          paymentStatus: apptObj.orderId.paymentStatus,
        };
      }
      
      return apptObj;
    });

    return NextResponse.json(unifiedAppointments);
  } catch (error) {
    console.error("Fetch technician jobs error:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
