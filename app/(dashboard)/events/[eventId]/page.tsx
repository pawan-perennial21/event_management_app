import dynamic from "next/dynamic";
import { getSingleEvent } from "@/api";
const EventDetails = dynamic(
    () => import("@/app/components/eventDetails"),
    { ssr: false }
);
export default async function EventDetailsPage({
    params: { eventId },
}: {
    params: { eventId: string };
}) {
    const event = await getSingleEvent(eventId);
    return <EventDetails items={event} />;
}
