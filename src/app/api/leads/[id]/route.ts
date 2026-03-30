import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { Technician } from "@/models/Technician";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const lead = await Lead.findById(id).populate("assignedTechnician");
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json(lead);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    await connectDB();
    
    // Explicitly update and populate
    const updatedLead = await Lead.findByIdAndUpdate(id, data, { new: true }).populate("assignedTechnician");
    
    if (!updatedLead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    
    // Trigger Notifications
    const { sendEmail } = await import("@/lib/email/sendEmail");
    const { technicianTemplate, adminTemplate, completionTemplate } = await import("@/lib/email/templates");

    // Case 1: Service Completion
    if (data.status === "COMPLETED" && updatedLead.email) {
      try {
        await sendEmail({
          to: updatedLead.email,
          subject: "Service Completed Successfully - Local Pankaj ✅",
          html: completionTemplate({
            name: updatedLead.name,
            service: updatedLead.service,
            requestId: updatedLead.requestId
          })
        });
      } catch (e) { console.error("Error sending completion email:", e); }
    }

    // Case 2: Technician Assignment (New conversion)
    if (data.status === "CONVERTED" || data.assignedTechnician || data.technician) {
      try {
        const techName = updatedLead.assignedTechnician?.name || data.techName || updatedLead.technician || "Service Expert";
        const techPhone = updatedLead.assignedTechnician?.phone || data.techPhone || "Expert Assigned";

        // 1. To Customer
        if (updatedLead.email) {
          await sendEmail({
            to: updatedLead.email,
            subject: "Expert Assigned to Your Service - Local Pankaj 👨‍🔧",
            html: technicianTemplate({
              service: updatedLead.service,
              techName: techName,
              techPhone: techPhone,
              date: "Today/Scheduled",
              time: "Shortly"
            })
          });
        }

        // 2. To Admin
        await sendEmail({
          to: process.env.ADMIN_EMAIL || "admin@localpankaj.com",
          subject: `Fulfillment Update: Technician Dispatched [${updatedLead.requestId}]`,
          html: adminTemplate({
            message: `Lead <strong>${updatedLead.service}</strong> has been assigned.`,
            details: `Assigned Specialist: <strong>${techName}</strong> (${techPhone})`
          })
        });
      } catch (emailError) {
        console.error("Post-patch email notification failed:", emailError);
      }
    }

    return NextResponse.json(updatedLead);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
