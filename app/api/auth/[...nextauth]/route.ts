import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: any = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password }: any = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!passwordsMatch) {
                        return null;
                    }

                    return { ...user.toObject(), id: user._id }; // Include user ID and other fields you may need
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt(
            token: { id: any; role: any },
            user: { id: any; role: any }
        ) {
            if (user) {
                token.id = user.id;
                token.role = user.role; // Include user role in the JWT token
            }
            return token;
        },
        async session(session: { user: any }, token: any) {
            session.user = token;
            return session;
        },
        async signIn(user: { id: any; role: any }) {
            // If the user is not an admin, you can customize the behavior or return null
            return { ...user, role: user.role };
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
