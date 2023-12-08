import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Fragment } from "react";
import EventList from "../components/eventList";
import { getAllEvent } from "@/api";
import SessionUser from "../components/Session";

export default async function Dashboard() {
    const data: any = await getAllEvent();
    return (
        <Fragment>
            <div>
                <SessionUser />
                <div>
                    <Link
                        className='flex justify-end m-2'
                        href={"/registerd-event"}
                    >
                        <Button className='bg-orange-500 w-[30%]  mx-auto hover:bg-orange-700 mt-7'>
                            Registered Event
                        </Button>
                    </Link>
                </div>
            </div>
            <EventList event={data?.event} />
        </Fragment>
    );
}
