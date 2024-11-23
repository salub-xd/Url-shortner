import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kisaner Market",
    description: "Kisaner Market to sell your goods directly to needy",
};

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
            <div className={'pt-20 pb-5 '}>
                {children}
            </div>
    );
}
