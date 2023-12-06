"use client";
import { postRegisterdEvent } from "@/api";
import { EventDetails } from "@/types/interface";
import dynamic from "next/dynamic";
import { useState } from "react";

const EventItem = dynamic(() => import("../eventItem"), {
    ssr: false,
});
export default function EventList({ event }: any) {
    const [registeredEvents, setRegisteredEvents] = useState<
        string[]
    >([]);

    // Function to register an event
    const registerEvent = async (eventId: string) => {
        if (!isEventRegistered(eventId)) {
            setRegisteredEvents((prevEvents) => [
                ...prevEvents,
                eventId,
            ]);

            const res = await postRegisterdEvent(eventId);
            if (res.registered) {
                return true;
            }
        } else {
            return false;
        }
    };

    // Function to check if an event is registered
    const isEventRegistered = (eventId: string) => {
        return registeredEvents.includes(eventId);
    };
    return (
        <ul>
            {event.length > 0 ? (
                <ul>
                    {event?.map((item: EventDetails) => (
                        <EventItem
                            key={item._id}
                            id={item._id}
                            title={item.title}
                            location={item.location}
                            date={item.date}
                            time={item.time}
                            isRegistered={item?.registered}
                            onRegister={() => registerEvent(item._id)}
                        />
                    ))}
                </ul>
            ) : (
                <p className='font-semibold text-center'>
                    Please Add Events
                </p>
            )}
        </ul>
    );
}
