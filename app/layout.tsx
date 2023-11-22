import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import GlobalStyleProvider from "./providers/GlobalStyleProvider";
import { AuthProvider } from "./providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <AuthProvider>
                    <GlobalStyleProvider>
                        {children}
                    </GlobalStyleProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
