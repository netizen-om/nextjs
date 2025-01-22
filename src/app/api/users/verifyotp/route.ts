import User from "@/models/userModel";
import { connect } from "@/dbConfig/doConfig";
import { NextRequest, NextResponse } from "next/server";

connect();
    
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, otp } = reqBody;

        // Validate input
        if (!id || !otp) {
            return NextResponse.json({ success: false, message: "Invalid input" }, { status: 400 });
        }

        // Find user
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Validate OTP
        if (otp === user.forgotPasswordToken) {
            return NextResponse.json({
                success: true,
                message: "OTP verified successfully",
                status: 200,
            });
        }

        return NextResponse.json({
            success: false,
            message: "Invalid OTP",
            status: 401,
        });
    } catch (error: any) {
        console.error("Error in OTP verification:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
