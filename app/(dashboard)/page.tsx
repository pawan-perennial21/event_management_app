import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import EventList from "../components/eventList";
import { getAllEvent } from "@/api";

export default async function Dashboard() {
    const data = await getAllEvent();
    return (
        <div>
            <Link
                className='flex justify-end m-2'
                href={"/add-event"}
            >
                <Button className='bg-blue-900 hover:bg-blue-900'>
                    Add Event
                </Button>
            </Link>
            <EventList items={data} />
        </div>
    );
}
