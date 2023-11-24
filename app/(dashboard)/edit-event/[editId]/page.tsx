import dynamic from "next/dynamic";
const EventForm = dynamic(
    () => import("@/app/components/eventForm"),
    { ssr: false }
);
import { getSingleEvent } from "@/api";

export default async function EditEvent({
    params: { editId },
}: {
    params: { editId: string };
}) {
    const data = await getSingleEvent(editId);
    const isEdit = true;
    return <EventForm isEdit={isEdit} formDataItem={data} />;
}
