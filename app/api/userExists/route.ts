import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

// export async function POST(req: any) {
//     try {
//         await connectMongoDB();
//         const { email } = await req.json();
//         const user = await User.findOne({ email }).select("_id");
//         return NextResponse.json({ user });
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function POST(req: any) {
//     try {
//         await connectMongoDB();
//         const { email } = await req.json();

//         // Check if a user with the given email exists
//         const user = await User.findOne({ email }).select("_id");

//         if (user) {
//             // User with the given email exists
//             return NextResponse.json({ user });
//         } else {
//             // User with the given email does not exist
//             return NextResponse.json(
//                 { message: "User not found" },
//                 { status: 404 }
//             );
//         }
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json(
//             { message: "An error occurred" },
//             { status: 500 }
//         );
//     }
// }
