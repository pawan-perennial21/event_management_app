import { getFeaturedEvents } from "@/data/dummy-data";
import React, { useEffect } from "react";
import EventList from "../components/eventList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

async function getData() {
    const res = await fetch("http://localhost:3000/api/events");

    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Dashboard() {
    const featuredEvents = getFeaturedEvents();
    const data = await getData();
    // const featuredEvent = data?.filter(
    //     (event: any) => event.isFeatured
    // );
    console.log("=======>", data);
    return (
        <div>
            <Link href={"/add-event"}>
                <Button>Add Event</Button>
            </Link>
            <EventList items={featuredEvents} />
        </div>
    );
}
