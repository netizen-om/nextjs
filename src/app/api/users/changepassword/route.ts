import User from "@/models/userModel"
import {connect} from "@/dbConfig/doConfig"
import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/helper/mailer";
import bcrypt from "bcryptjs"

connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const { id,newPass } = reqBody

        const user = await User.findById(id)
        if(!user){
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const hasedNewPassword = await bcrypt.hash(newPass,10)
        console.log(hasedNewPassword);
        
        user.password = hasedNewPassword
        await user.save()

        return NextResponse.json({ success: true, message: "Password changed successfully" }, { status: 200 });

    } catch (error : any) {
        return NextResponse.json({error : error}, {status : 500})
    }
}