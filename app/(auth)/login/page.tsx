import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginPage from "@/app/components/loginPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Login() {
    const session = await getServerSession(authOptions);

    if (session) redirect("/");
    return <LoginPage />;
}
