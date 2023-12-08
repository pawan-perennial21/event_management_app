import { connectMongoDB } from "@/lib/mongodb";
import Event from "@/models/event";
import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";

export const GET = cache(async () => {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Find all events
        const event = await Event.find();

        // Return the list of events
        return NextResponse.json({ event });
    } catch (error) {
        // Handle any errors and return an error response
        console.error("Error retrieving topics:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
});

export const POST = cache(async (request: NextRequest) => {
    try {
        // Destructure title and description from the JSON body
        const { title, description, date, time, location } =
            await request.json();
        const timeAsDate = new Date(`1970-01-01T${time}`);
        // Connect to MongoDB
        await connectMongoDB();

        // Create a new event
        await Event.create({
            title,
            description,
            date,
            time: timeAsDate,
            location,
            registered: false,
        });

        // Return a success response
        return NextResponse.json({
            message: "Event Created",
            status: 200,
        });
    } catch (error) {
        // Handle any errors and return an error response
        console.error("Error creating event:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
});
