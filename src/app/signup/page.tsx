"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    // Creating a user
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        fullName: "",
    });

    // making a validated user
    const [updatedUser, setUpdatedUser] = React.useState({
        updatedEmail: "",
        updatedPassword: "",
        updatedFullName: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    // submit Handler to redirect user to Login pge
    const submitHandle = (event: any) => {
        event.preventDefault();
    };

    const onSignup = async () => {
        if (updatedUser.updatedFullName!="" && updatedUser.updatedEmail!="" && updatedUser.updatedPassword!="") {
            toast.error("The form validation failed");
            console.log(formValidationHandler())
        } else {
            try {
                setLoading(true);

                const response = await axios.post("/api/users/signup", user);
                console.log("Signup success", response.data);
                toast.success("Signup success");
                router.push("/login");
            } catch (error: any) {
                console.log("Signup failed", error.message);

                toast.error("This didn't work");
            } finally {
                setLoading(false);
            }
        }
    };

    // validating Data
    function formValidationHandler() {
        let checks = 0;
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (user.fullName.length <= 0 && user.fullName.length >= 40) {
            toast.error("Please enter a valid name");
        } else {
            setUpdatedUser({
                ...updatedUser,
                updatedFullName: user.fullName,
            });
            toast.success("The name was Validated");
            
        }
        if (user.email.toLowerCase().match(re)) {
            toast.success("Email is valid");
            setUpdatedUser({
                ...updatedUser,
                updatedEmail: user.email,
            });
            
        } else {
            toast.error("The email is not valid");
        }
        function checkPassword() {
            let strength = 0;
            if (user.password.match(/[a-z]+/)) {
                strength += 1;
            }
            if (user.password.match(/[A-Z]+/)) {
                strength += 1;
            }
            if (user.password.match(/[0-9]+/)) {
                strength += 1;
            }
            if (user.password.match(/[$@#&!]+/)) {
                strength += 1;
            }
            return strength;
        }
        if (checkPassword() >= 4) {
            toast.success("Password is valid");
            setUpdatedUser({
                ...updatedUser,
                updatedPassword: user.password,
            });
            checks = +1;
        } else {
            toast.error("The password is not valid");
        }
        
    }

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.fullName.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                    Signup
                </h2>
                <form onSubmit={submitHandle}>
                    <input
                        type="fullName"
                        id="fullName"
                        name="fullName"
                        value={user.fullName}
                        onChange={(event) =>
                            setUser({
                                ...user,
                                fullName: event.target.value,
                            })
                        }
                        className="w-full border rounded-md p-3 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="Your Full Name"
                    />
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
                        onClick={onSignup}
                        className="bg-gray-300 text-black rounded-md px-4 py-2 hover:bg-gray-400 transition-colors w-full"
                        disabled={buttonDisabled}
                    >
                        Signup
                    </button>
                </form>
                <p className="mt-4 text-gray-300 text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
