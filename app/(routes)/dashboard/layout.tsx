import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Shortify Dashboard",
};

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if (!session) {
        redirect(`/login`);
    }

    return (
        <div className="dark:bg-black bg-white mt-16">
            <div className="flex justify-center items-center gap-x-1 pt-6 ">
                <Link href={'/dashboard'}>
                    <Button>Dashboard</Button>
                </Link>
                <Link href={'/dashboard/urls'}>
                    <Button>Urls</Button>
                </Link>
                <Link href={'/dashboard/clicks'}>
                    <Button>Clicks</Button>
                </Link>
                <Link href={'/dashboard/settings'}>
                    <Button>Settings</Button>
                </Link>
            </div>
            {children}
        </div>
    )
}
