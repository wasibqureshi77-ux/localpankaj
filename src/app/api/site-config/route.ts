import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { SiteConfig } from "@/models/SiteConfig";

export async function GET() {
  await connectDB();
  let config = await SiteConfig.findOne({});
  if (!config) {
    config = await SiteConfig.create({});
  }
  return NextResponse.json(config);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Saving site config:", data);
    await connectDB();
    const config = await SiteConfig.findOneAndUpdate({}, data, { new: true, upsert: true });
    console.log("Saved config:", config);
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
