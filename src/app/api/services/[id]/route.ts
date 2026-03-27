import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Service } from "@/models/Service";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    await connectDB();
    
    // Auto-generate slug if name changed but slug not provided
    if (data.name && !data.slug) {
      data.slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found in database" }, { status: 404 });
    }

    return NextResponse.json(updatedService);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const deletedService = await Service.findByIdAndDelete(id);
    
    if (!deletedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
