"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import User from "@/models/userModel"
import { redirect, useParams, useRouter } from "next/navigation";


export default function VerifyEmailPage() {
    const [otp,setOtp] = useState(0);
    const params = useParams();
    const verifyOtp = async() => {
        try {
            console.log(params.id );
            const response = await axios.post("/api/users/verifyotp", { id: params.id, otp });
            console.log(response);
            
        } catch (error : any) {
            console.log(error);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-2xl">Enter OTP</h1>
            
            <input 
            className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            onChange={(e) => setOtp(parseInt(e.target.value))}
            type="text"
            placeholder="email"
            />

            <button
            onClick={verifyOtp}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                Verify
            </button>

        </div>
    )

}