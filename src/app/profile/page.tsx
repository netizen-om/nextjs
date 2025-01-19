"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server"
import { useState } from "react";
import toast from "react-hot-toast"

export default function ProfilePage() { 

    const router = useRouter()
    const [data,setData] = useState("nothing")
    const getUserData = async() => {
        try {
            const res = await axios.get("/api/users/me")
            console.log(res.data);
            
            setData(res.data.data._id)
        } catch (error : any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout sucessful")
            router.push("/login")
        } catch (error : any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    return (
        <div>
            <div className="flex justify-center flex-col items-center min-h-screen">
                <h1 className="text-3xl font-bold">Profile Page</h1>
                <h2 >{data === 'nothing' ? "Nothing" :<Link href={`/profile/${data}`}> {data} </Link> }</h2>
                <hr />
                <button 
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-600 text-white py-2 px-4 rounded">Logout</button>
                <button 
                onClick={getUserData}
                className="bg-purple-500 mt-4 hover:bg-purple-600 text-white py-2 px-4 rounded">Get user data</button>
            </div>
        </div>
    )
}