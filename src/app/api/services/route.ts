import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Service } from "@/models/Service";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: "ACTIVE" }).sort({ createdAt: -1 });
    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectDB();
    
    // Auto-generate slug if not provided
    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const service = await Service.create(data);
    return NextResponse.json(service);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
