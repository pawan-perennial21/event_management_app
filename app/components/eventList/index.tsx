"use client"
import { postRegisterdEvent } from "@/api";
import { EventDetails } from "@/types/interface";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const EventItem = dynamic(() => import("../eventItem"), {
    ssr: false,
});
export default function EventList({ event }: any) {
    // Function to register an event
    const router = useRouter();
    const registerEvent = async (eventId: string) => {
        const res = await postRegisterdEvent(eventId);
        if (res.statusCode === "ok") {
            router.refresh();
        }
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
