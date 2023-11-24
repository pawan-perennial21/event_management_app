"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email,
                password,
                role:'admin',
                redirect: false,
            });
            console.log("signIn===>", res);
            if (res?.error) {
                setError("Invalid Credentials");
                return;
            }

            router.replace("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='grid place-items-center h-screen'>
            <div className='shadow-lg p-5 sm:w-3/4 md:w-2/4 lg:w-1/4 rounded-lg border-t-4 border-blue-700'>
                <h1 className='text-xl font-bold my-4'>Login</h1>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-3'
                >
                    <Input
                        className='p-2 rounded-md'
                        onChange={(e) => setEmail(e.target.value)}
                        type='text'
                        placeholder='Email'
                    />
                    <Input
                        className='p-2 rounded-md'
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Password'
                    />
                    <Button className='bg-blue-700 hover:bg-blue-700'>
                        Login
                    </Button>
                    {error && (
                        <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                            {error}
                        </div>
                    )}

                    <Link
                        className='text-sm mt-3 text-right'
                        href={"/register"}
                    >
                        Don't have an account?{" "}
                        <span className='underline'>Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
