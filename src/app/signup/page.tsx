"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function singupPage(){ 

    const [user,setUser] = useState({
        username : "",
        password : "",
        email : ""
    })

    const onSignup = async() => {

    }

    return (
       <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {/* <h1>{loading ? "Processing" : "Signup"}</h1> */}
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user , username : e.target.value})}
            placeholder="username"
            />
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
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Signup here</button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}