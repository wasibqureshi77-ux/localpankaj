import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";

export async function GET() {
  try {
    await connectDB();
    // In a real app we'd populate, but for simplicity I'll return mock if empty or transform
    const appointments = await Appointment.find({}).sort({ date: 1 });
    
    // Transform to my UI friendly format if needed
    const formatted = appointments.map((a: any) => ({
      ...a._doc,
      customer: a.customer || "System User", // Fallback for simple display
      service: a.service || "Maintenace Service",
      location: a.location || "Jaipur Central",
      time: a.time || new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
