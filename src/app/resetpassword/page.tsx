"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import User from "@/models/userModel"
import { redirect, useRouter } from "next/navigation";


export default function VerifyEmailPage() {

    const router = useRouter()

    const [email,setEmail] = useState("your email")
    const [isEmailValid,setIsEmailValid] = useState(true)

    const verifyEmail = async() => {
        try {
            const response = await axios.post("/api/users/getuserid" , {email})
            const id = response.data.data
            router.push(`/resetpassword/:${id}`)
        } catch (error : any) {
            console.log("Login Failed" , error);
            toast.error(error.message)
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-2xl">Reaset Password</h1>
            <h2 className="mt-3">Enter your email</h2>
            
            <input 
            className="p-2 mt-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email"
            />

            {isEmailValid ? "" : <h4>Inavlid Email</h4>  }

            <button
            onClick={verifyEmail}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                Verify
            </button>
            <Link href="/login">Visit Login Page</Link>

        </div>
    )

}