import { connectMongoDB } from "@/lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    console.log("GET");
    try {
      await connectMongoDB(); // Make sure the database is connected before querying

      const allPosts = await Event.find({}); 
        return NextResponse.json(
            { message: "OK", allPosts },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            {
                message: "Error",
                err,
            },
            { status: 500 }
        );
    }
};

export const POST = async (req: Request, res: Response) => {
    const { title, description, location, image, isFeatured } = await req.json();
    try {
        const post = {
            title,
            id: Date.now().toString(),
            description,
            location,
            date: new Date(),
            image,
            isFeatured,
      };
      await connectMongoDB(); // Make sure the database is connected before adding a post

      const newPost = new Event(post);
      await newPost.save();
        return NextResponse.json(
            { message: "OK", post },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            {
                message: "Error",
                err,
            },
            { status: 500 }
        );
    }
};
