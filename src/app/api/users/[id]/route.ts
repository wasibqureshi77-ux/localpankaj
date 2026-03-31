import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    // Security check: Only allow users to update their own profile (or admin)
    if (session.user.id !== id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, phone, address, city, pincode, state } = body;

    await connectDB();
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(name && { name }),
          ...(email && { email }),
          ...(phone && { phone }),
          ...(address && { address }),
          ...(city && { city }),
          ...(pincode && { pincode }),
          ...(state && { state }),
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
       message: "Profile updated successfully",
       user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
          city: updatedUser.city,
          pincode: updatedUser.pincode,
          state: updatedUser.state,
       }
    });

  } catch (error: any) {
    console.error("User update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
