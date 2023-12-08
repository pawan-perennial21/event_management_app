"use client";
import { deleteEvent } from "@/api";
import { Button } from "@/components/ui/button";
import { EventDetails, EventFormValues } from "@/types/interface";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

interface IProps {
    title: string;
    date: string; // or use a Date type if the date is a specific format
    location: string;
    time: string;
    id: string;
    isRegistered: boolean | undefined;
    onRegister: () => void;
    // Add other properties if necessary
}

export default function EventItem(props: IProps) {
    const {
        title,
        date,
        location,
        time,
        id,
        isRegistered,
        onRegister,
    } = props;
    const { data: session }: any = useSession();
    const router = useRouter();
    const humanRedable = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const formattrdAddress = location.replace(",", "\n");
    const dateObject = new Date(time);

    // Format the date and time according to the user's locale
    const formattedDateTime = dateObject.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
    });
    const exploreLink = `/events/${id}`;

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Are you sure?");
        if (confirmed) {
            const res: any = await deleteEvent(id);

            if (res.statusCode === "ok") {
                router.refresh();
            }
        }
    };
    return (
        <li className='border rounded-lg overflow-hidden shadow-md p-4 md:p-6 lg:p-8 mx-2 md:mx-4 lg:mx-20 my-2 md:my-5 lg:my-10 bg-white'>
            <div className='flex justify-between'>
                <div className='mb-4'>
                    <h2 className='text-2xl font-semibold mb-4'>
                        {title}
                    </h2>
                    <div>
                        <time className='text-gray-500'>
                            {humanRedable}
                        </time>
                    </div>
                    <div>
                        <address className='text-gray-500'>
                            {formattrdAddress}
                        </address>
                    </div>
                    <div>
                        <time className='text-gray-500'>
                            {formattedDateTime}
                        </time>
                    </div>
                </div>
                {session?.user?.role === "admin" && (
                    <div className='flex'>
                        <Button className='bg-red-500 hover:bg-red-600'>
                            <MdOutlineDelete
                                size={24}
                                onClick={() => handleDelete(id)}
                            />
                        </Button>
                        <Link href={`/edit-event/${id}`}>
                            <Button className='bg-green-500 hover:bg-green-600 ml-2'>
                                <FaRegEdit size={24} />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
            <div>
                <Link
                    href={exploreLink}
                    className='text-blue-500 hover:underline'
                >
                    <Button className='bg-blue-500 hover:bg-blue-600'>
                        {" "}
                        Explore Events
                    </Button>
                </Link>
            </div>
            <div className='flex justify-between items-center mt-4'>
                {/* Add the registration button and handle its click event */}
                {!isRegistered ? (
                    <Button
                        className='bg-blue-500 hover:bg-blue-600'
                        onClick={onRegister}
                    >
                        Register
                    </Button>
                ) : (
                    <Button
                        className='bg-green-500 hover:bg-green-600'
                        onClick={onRegister}
                    >
                        Registered
                    </Button>
                )}
            </div>
        </li>
    );
}
