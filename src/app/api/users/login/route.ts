import { connect } from "@/dbConfig/doConfig"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {password,email} = reqBody
        console.log(reqBody);
        
        const user = await User.findOne({email})
        
        if(!user){
            return NextResponse.json({error : "User does not exist"}, {status : 400})
        }
        
        const isPasswordCorrent = await bcrypt.compare(password,user.password)
        
        
        if(!isPasswordCorrent){
            return NextResponse.json({error : "Invalid Password"}, {status : 400})
        }

        //create token data
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }

        const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn : "1h"})

        const response = NextResponse.json({
            message : "Login Successful",
            success : true
        })

        response.cookies.set("token" , token , {
            httpOnly : true
        })

        return response;


    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}