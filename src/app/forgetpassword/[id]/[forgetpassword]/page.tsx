"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import User from "@/models/userModel"
import { redirect, useParams, useRouter } from "next/navigation";


export default function VerifyEmailPage() {

    const router = useRouter()

    const [pass1,setPass1] = useState("");
    const [pass2,setPass2] = useState("");

    const params = useParams();
    const changePassword = async() => {
        try {     
            if(pass1 !== pass2) return
            const response = await axios.post("/api/users/changepassword" , {id : params.id , newPass : pass1})

            if(response.data.success){
                router.push("/login")
            }
            
        } catch (error : any) {
            console.log(error);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-2xl">Reset Password</h1>
            
            <input 
            className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            onChange={(e) => setPass1(e.target.value)}
            type="text"
            placeholder="Password"
            />
            <input 
            className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            onChange={(e) => setPass2(e.target.value)}
            type="text"
            placeholder="Password"
            />

            <button
            onClick={changePassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                Change Password
            </button>

        </div>
    )

}