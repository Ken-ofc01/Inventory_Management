// makes the component client side
"use client";

import Link from "next/link";
import React from "react";

import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function SignUp() {
    

  // defining User Value on Signup
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        fullName: "",
    });

    // Sign Up Function
    const onSignup = async () => {};

    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className=" bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={(event) => setUser ({
                ...user, email: event.target.value
              })}
              className="w-full border rounded-md p-3 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-300">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={user.fullName}
              onChange={(event) => setUser ({
                ...user, fullName: event.target.value
              })}
              className="w-full border rounded-md p-3 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Your fullName"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(event) => setUser ({
                ...user, password: event.target.value
              })}
              className="w-full border rounded-md p-3 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            onClick={onSignup}
            className="bg-gray-300 text-black rounded-md px-4 py-2 hover:bg-gray-400 transition-colors w-full"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-gray-300 text-center">Already have an account? <Link href="/login" className="text-blue-500 ">Log In</Link></p>
      </div>
    </div>
    );
}
