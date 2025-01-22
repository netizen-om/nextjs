import User from "@/models/userModel"
import {connect} from "@/dbConfig/doConfig"
import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/helper/mailer";

connect()

const generateRandomFourDigitNumber = (): number => {
    return Math.floor(1000 + Math.random() * 9000);
};

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        console.log(email);
        
        
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error : "User not found"}, {status : 400})
        } else {
            user.forgotPasswordToken = generateRandomFourDigitNumber()
            const savedUser = await user.save()
            sendEmail({email : savedUser.email,emailType : "RESET" , userId : savedUser._id})
            return NextResponse.json( {data : savedUser._id} , {status : 200})
        }

    } catch (error : any) {
        return NextResponse.json({error : error}, {status : 500})
    }
}