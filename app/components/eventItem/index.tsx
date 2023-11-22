"use client";
import Link from "next/link";
import React from "react";

export default function EventItem(props: any) {
    const { title, image, date, location, id } = props;
    const humanRedable = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const formattrdAddress = location.replace(",", "\n");
    const exploreLink = `/events/${id}`;
    return (
        <li className='border rounded-lg overflow-hidden shadow-md p-6 m-4 bg-white'>
            <img
                src={"/" + image}
                alt={title}
                className='w-full h-80 mb-4 rounded-md'
            />
            <div className='flex flex-col'>
                <div className='mb-4'>
                    <h2 className='text-2xl font-semibold'>
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
                </div>
                <div>
                    <Link
                        href={exploreLink}
                        className='text-blue-500 hover:underline'
                    >
                        Explore Events
                    </Link>
                </div>
            </div>
        </li>
    );
}
