import React from 'react'
import { auth } from '@/auth';
import { Footer } from '@/components/app/Footer'
import { Navbar } from '@/components/app/Navbar'

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <>
            <div className="fixed left-0 top-0 -z-10 h-full w-full   ">
                <div className="dark:absolute dark:top-0 dark:z-[-2] dark:h-screen dark:w-screen dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
                </div>
            <Navbar user={session?.user && session.user} />
            <main className='mt-10'>{children}</main>
            <Footer />
        </>
    )
}