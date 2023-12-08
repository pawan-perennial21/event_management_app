"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function SessionUser() {
    const { data: session }: any = useSession();
    return (
        <div>
            {session?.user?.role === "admin" && (
                <Link
                    className='flex justify-end m-2'
                    href={"/add-event"}
                >
                    <Button className='bg-blue-900 w-[30%]  mx-auto hover:bg-blue-900 mt-7'>
                        Add Event
                    </Button>
                </Link>
            )}
        </div>
    );
}
