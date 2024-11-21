import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainNavbar } from "@/components/app/Navbar";
import { MarketNavbar } from "@/components/app/Market-Navbar";
// import { auth } from "@/auth";
// import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kisaner Market",
    description: "Kisaner Market to sell your goods directly to needy",
};

export default async function MarketLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const session = await auth();

    // console.log(session);

    return (
        // <SessionProvider session={session} >
            <div className={'pt-20 pb-5 '}>
                {children}
            </div>
        // </SessionProvider> 

    );
}
