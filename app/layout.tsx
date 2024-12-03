import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/app/Navbar";
import { Footer } from "@/components/app/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shortify - Url-Shornter",
  description: "Shorten, track, and manage your links easily with our fast and secure URL shortener service. Create custom short URLs, monitor click analytics, and enhance your sharing experience online.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <SessionProvider session={session} >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <div className="fixed left-0 top-0 -z-10 h-full w-full">
              <div className="relative h-full w-full bg-white dark:bg-black ">
                <div className="dark:animate-beam  dark:absolute dark:bottom-0 dark:left-0 dark:right-0 dark:top-0  dark:bg-[linear-gradient(to_right,#4f4f4f2e_2px,transparent_2px),linear-gradient(to_bottom,#4f4f4f2e_2px,transparent_2px)] dark:bg-[size:50px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
                </div>
                <div className=" dark:absolute dark:left-0 dark:right-0 dark:top-[-10%  dark:h-[1000px] dark:w-[1000px]  dark:rounded-full dark:bg-[radial-gradient(circle_400px_at_50%_200px,#fbfbfb36,#000)]">
                </div>
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_44px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              </div>
            </div>
            <Navbar user={session?.user && session.user} />
            {children}
            <Analytics />
            <Footer />
          </ThemeProvider>
        </body>
      </html >
    </SessionProvider >
  );
}
