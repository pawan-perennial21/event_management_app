import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
    try {
        const { name, email, password, role } = await req.json();

        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email }).select(
            "_id"
        );

        if (existingUser) {
            // User with the given email already exists
            return NextResponse.json({
                message: "User already exists",
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();

        // Create a new user
        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return NextResponse.json({
            message: `${role} registered`,
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message:
                    "An error occurred while registering the user.",
            },
            { status: 500 }
        );
    }
}
