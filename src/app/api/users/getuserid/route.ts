import User from "@/models/userModel"
import {connect} from "@/dbConfig/doConfig"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        console.log(email);
        
        
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error : "User not found"}, {status : 400})
        } else {
            return NextResponse.json( {data : user._id} , {status : 200})
        }

    } catch (error : any) {
        return NextResponse.json({error : error}, {status : 500})
    }
}