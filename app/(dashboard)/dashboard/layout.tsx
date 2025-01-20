import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard/Dashboard-Navbar";

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
        <div className="mt-14">
            <DashboardNavbar />
            {children}
        </div>
    )
}
