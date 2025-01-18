import { connect } from "@/dbConfig/doConfig"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";

connect()

export const runtime = 'nodejs'

// Define config for the route
export const dynamic = 'force-dynamic'

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {username,password,email} = reqBody
        console.log(reqBody);

        //check if user Already exists
        const user = await User.findOne({email})
        if(user) {
            return NextResponse.json({error : "User Already exists"}, {status : 400})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password : hasedPassword
        })
        
        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message : "User created successfully",
            status : 201,
            success : true,
            savedUser
        })

    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}