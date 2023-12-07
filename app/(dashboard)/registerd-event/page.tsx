import dynamic from "next/dynamic";
import { getAllEvent } from "@/api";
import EventList from "@/app/components/eventList";
const EventDetails = dynamic(
    () => import("@/app/components/eventDetails"),
    { ssr: false }
);
export default async function EventRegisterPage() {
    const data: any = await getAllEvent();
    const registeredEvents = data?.event.filter(
        (el: any) => el.registered
    );
    return (
        <>
            {registeredEvents.length > 0 ? (
                <EventList event={registeredEvents} />
            ) : (
                <p className='font-semibold text-center'>No Event Registered</p>
            )}
        </>
    );
}
