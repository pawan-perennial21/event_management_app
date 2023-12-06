import { connectMongoDB } from "@/lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        await connectMongoDB();
        const event = await Event.findOne({ _id: id });

        if (!event) {
            return NextResponse.json({
                message: "Event not found",
                status: 404,
            });
        }

        return NextResponse.json({ event }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching topic", error },
            { status: 500 }
        );
    }
}

export const DELETE = async (req: Request, res: Response) => {
    const id = req.url.split("/events/")[1];

    try {
        // Validate if the ID is a valid ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid ID" },
                { status: 400 }
            );
        }

        const deletedEvent = await Event.findOneAndDelete({
            _id: new ObjectId(id),
        });

        if (!deletedEvent) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Event Deleted",
            status: 200,
            statusCode: "ok",
            deletedEvent,
        });
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 500 }
        );
    }
};

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const { title, description, date, time, location } =
        await request.json();
    const timeAsDate = new Date(`1970-01-01T${time}`);

    try {
        await connectMongoDB();
        await Event.findByIdAndUpdate(id, {
            title,
            description,
            date,
            time: timeAsDate,
            location,
        });
        return NextResponse.json({
            message: "Event updated",
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Error updating event",
            status: 500,
            error,
        });
    }
}

export async function PATCH(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    const { registered, ...eventData } = await Event.findOne({
        _id: id,
    });

    try {
        await connectMongoDB();
        await Event.findByIdAndUpdate(id, {
            ...eventData?._doc,
            registered: true,
        });
        return NextResponse.json({
            message: "Registered updated",
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Error updating Registered Event",
            status: 500,
            error,
        });
    }
}
