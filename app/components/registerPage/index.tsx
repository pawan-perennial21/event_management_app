"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { registrationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
    name: string;
    email: string;
    password: string;
};

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(registrationSchema),
    });
    const [apiError, setApiError] = useState("");
    // const [error, setError] = useState("");
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (dataValue) => {
        console.log(dataValue);
        try {
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...dataValue,
                    role: "user",
                }),
            });
            const data = await res.json();
            if (data.status === 201) {
                router.push("/login");
            } else if (data.status === 400) {
                setApiError(data.message);
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    };

    resolver: return (
        <div className='grid place-items-center h-screen'>
            <div className='shadow-lg p-5 sm:w-3/4 md:w-2/4 lg:w-1/4 rounded-lg border-t-4 border-blue-700'>
                <h1 className='text-xl font-bold my-4'>Register</h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-3'
                >
                    <Input
                        {...register("name")}
                        type='text'
                        placeholder='Full Name'
                    />
                    {errors.name?.message && (
                        <Label className='text-red-500'>
                            {errors.name?.message}
                        </Label>
                    )}
                    <Input
                        {...register("email")}
                        type='text'
                        placeholder='Email'
                    />
                    {errors.email?.message && (
                        <Label className='text-red-500'>
                            {errors.email?.message}
                        </Label>
                    )}
                    <Input
                        {...register("password")}
                        type='password'
                        placeholder='Password'
                    />
                    {errors.password?.message && (
                        <Label className='text-red-500'>
                            {errors.password?.message}
                        </Label>
                    )}

                    <Button className='bg-blue-700 hover:bg-blue-700'>
                        Register
                    </Button>
                    {apiError && (
                        <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                            {apiError}
                        </div>
                    )}
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
