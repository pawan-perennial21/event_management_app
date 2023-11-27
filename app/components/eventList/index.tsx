import { EventDetails } from "@/types/interface";
import dynamic from "next/dynamic";

const EventItem = dynamic(() => import("../eventItem"), {
    ssr: false,
});
export default function EventList(props: any) {
    const {
        items: { event },
    } = props;
    return (
        <ul>
            {event.length > 0 ? (
                <ul>
                    {event.map((item: EventDetails) => (
                        <EventItem
                            key={item._id}
                            id={item._id}
                            title={item.title}
                            location={item.location}
                            date={item.date}
                            time={item.time}                       />
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
