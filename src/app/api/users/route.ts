import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import { Lead } from "@/models/Lead";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    
    // Add requestCount to each user
    const usersWithStats = await Promise.all(users.map(async (user: any) => {
      const requestCount = await Lead.countDocuments({
        $or: [
          { email: user.email },
          { phone: user.phone }
        ]
      });
      return { ...user, requestCount };
    }));

    return NextResponse.json(usersWithStats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
