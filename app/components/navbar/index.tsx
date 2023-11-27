"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
    const { data: session }: any = useSession();
    return (
        <nav className='bg-blue-900 p-4 flex justify-between items-center'>
            <Link href='/' className='text-white text-lg font-bold'>
                Event Manager App
            </Link>
            <div className='flex text-white items-center'>
                <p className='mr-5 bg-orange-500 p-2 rounded-lg'>
                    {session?.user?.role}
                </p>
                <p className='mr-5 bg-blue-200 p-2 text-black font-semibold rounded-lg'>
                    {session?.user?.name}
                </p>
                <Button
                    onClick={() => signOut({ redirect: true })}
                    className='bg-blue-800 hover:bg-blue-800 text-white'
                >
                    Logout
                </Button>
            </div>
        </nav>
    );
}
