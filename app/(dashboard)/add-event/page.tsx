import dynamic from "next/dynamic";
const EventForm = dynamic(
    () => import("@/app/components/eventForm"),
    { ssr: false }
);

export default function EventFormPage() {
    const formDataItem = {
        event: {
            title: "",
            description: "",
            location: "",
            date: "",
            time: "",
        },
    };
    const isEdit = false;
    return (
        <>
            <EventForm formDataItem={formDataItem} isEdit={isEdit} />
        </>
    );
}
