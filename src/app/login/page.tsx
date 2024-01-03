// makes the component client side
"use client";

import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";

import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    // defining User Value on Login
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    
    // Login Function
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login Success");
            console.log("Login Success",response.data);
            router.push("/profile")
        }catch (err:any) {
            toast.error("Your Credentials are invalid. Please try again")
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    };
    const submitHandle = (event: any) => {
        event.preventDefault();
    };
    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0

        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                    Log In
                </h2>
                <form onSubmit={submitHandle}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={(event) =>
                                setUser({
                                    ...user,
                                    email: event.target.value,
                                })
                            }
                            className="w-full border rounded-md p-3 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Your email"
                            />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={(event) =>
                                setUser({
                                    ...user,
                                    password: event.target.value,
                                })
                            }
                            className="w-full border rounded-md p-3 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Your password"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={onLogin}
                        className="bg-gray-300 text-black rounded-md px-4 py-2 hover:bg-gray-400 transition-colors w-full"
                        // disabled={buttonDisabled}
                    >
                        Log In
                    </button>
                </form>
                <p className="mt-4 text-gray-300 text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
