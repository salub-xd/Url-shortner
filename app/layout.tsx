import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

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
  keywords: [
    "Salub",
    "Shortify",
    "URL shortener",
    "Shortify shortener",
    "link shortener",
    "short URLs",
    "bitly alternative",
    "custom short links",
    "trackable links",
  ],
  authors: [{ name: "Salub", url: "https://salub.netlify.app" }],
  openGraph: {
    title: "Shortify - URL Shortener",
    description:
      "Create and manage short URLs effortlessly with Shortify. Perfect for businesses, creators, and anyone looking to simplify their links.",
    url: "https://links-shortify.vercel.app",
    siteName: "Shortify - URL Shortener",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shortify - URL Shortener",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salub - URL Shortener",
    description:
      "Simplify your links with Shortify, the fast and efficient URL shortener. Share smarter today.",
    images: ["/og-image.png"],
  },

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
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  </SessionProvider >
  );
}
