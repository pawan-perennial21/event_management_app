"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: {
        preventDefault: () => void;
        target: any;
    }) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are necessary.");
            return;
        }

        try {
            // const resUserExists = await fetch("api/userExists", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ email }),
            // });

            // const { user } = await resUserExists.json();

            // if (user) {
            //     setError("User already exists.");
            //     return;
            // }

            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role: isAdmin ? "admin" : "user",
                }),
            });
            const data = await res.json();
            console.log("datadata====>", data);
            if (data.status === 201) {
                const form = e.target;
                form.reset();
                router.push("/login");
            } else if (data.status === 400) {
                setError(data.message);
            }
            // if (res.ok) {
            //     const form = e.target;
            //     form.reset();
            //     router.push("/login");
            // } else {
            //     console.log("User registration failed.");
            // }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    };
    return (
        <div className='grid place-items-center h-screen'>
            <div className='shadow-lg p-5 sm:w-3/4 md:w-2/4 lg:w-1/4 rounded-lg border-t-4 border-blue-700'>
                <h1 className='text-xl font-bold my-4'>Register</h1>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-3'
                >
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        placeholder='Full Name'
                    />
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        type='text'
                        placeholder='Email'
                    />
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Password'
                    />
                    <Button className='bg-blue-700 hover:bg-blue-700'>
                        Register
                    </Button>

                    {error && (
                        <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                            {error}
                        </div>
                    )}
                    {/* {isAdmin && ( */}
                    <label className='flex items-center gap-2'>
                        <Input
                            type='checkbox'
                            checked={isAdmin}
                            onChange={() => setIsAdmin(!isAdmin)}
                        />
                        Admin
                    </label>
                    {/* )} */}

                    <Link
                        className='text-sm mt-3 text-right'
                        href={"/login"}
                    >
                        Already have an account?{" "}
                        <span className='underline'>Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
