import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Auth",
    description: "",
};

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
            <div className={'mx-4 pt-20 pb-5 '}>
                {children}
            </div>
    );
}
