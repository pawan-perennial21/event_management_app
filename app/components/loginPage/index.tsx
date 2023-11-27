"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import { Label } from "@/components/ui/label";

type Inputs = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
    });
    const [apiError, setApiError] = useState("");

    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (dataValue) => {
        try {
            const res = await signIn("credentials", {
                ...dataValue,
                redirect: false,
            });
            if (res?.error) {
                setApiError("Invalid Credentials");
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
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-3'
                >
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
                    <Button
                        type='submit'
                        className='bg-blue-700 hover:bg-blue-700'
                    >
                        Login
                    </Button>
                    {apiError && (
                        <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                            {apiError}
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
