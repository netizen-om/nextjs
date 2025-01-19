import { connect } from "@/dbConfig/doConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server"

connect()

export async function GET( request:NextRequest){
    try {
       const userId = getDataFromToken(request)
       const user = await User.findOne({_id : userId}).select("-password")

       return NextResponse.json({
            message : "User Found",
            data : user
       })
    } catch (error:any) {
    return NextResponse.json({error : error.message},{status : 400 })
    }
}