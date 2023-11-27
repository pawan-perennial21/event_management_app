"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import EventList from "../components/eventList";
import { getAllEvent } from "@/api";
import { useSession } from "next-auth/react";

export default async function Dashboard() {
    const { data: session }: any = useSession();
    const data = await getAllEvent();
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
            <EventList items={data} />
        </div>
    );
}
