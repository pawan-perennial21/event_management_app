"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
    const { data }: any = useSession();

    console.log(data?.token.token);
    return (
        <nav className='bg-blue-900 p-4 flex justify-between items-center'>
            <Link href='/' className='text-white text-lg font-bold'>
                Event Manager App
            </Link>
            <div className='flex text-white items-center'>
                {/* <p className="mr-5">{session?.user?.name}</p> */}
                <Button
                    onClick={() => signOut()}
                    className='bg-blue-800 hover:bg-blue-800 text-white'
                >
                    Logout
                </Button>
            </div>
        </nav>
    );
}
