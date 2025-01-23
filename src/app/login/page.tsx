"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState,useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage(){ 
    const router = useRouter()

    const [buttonDisabled,setButtonDisabled] = useState(false)
    const [loading,setLoading] = useState(false)

    const [user,setUser] = useState({
        password : "",
        email : ""
    })

    useEffect(() => {
        if( user.email.length > 0 || user.password.length > 0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user] )

    const onLogin = async() => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("Login success" , response);
            toast.success("Login Success")
            router.push("/profile")
            
        } catch (error : any){
            console.log("Login Failed" , error);
            toast.error(error.message)
        }
    }

    return (
       <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user , email : e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user , password : e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>
            <Link href="/signup">Visit Signup Page</Link>
            <Link href="/forgetpassword">Forget password?</Link>
        </div>
    )
}