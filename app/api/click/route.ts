import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { parse } from 'next-useragent';
import { getLocationData } from "@/lib/getLocation";

export async function POST(req: Request) {

    try {
        const { slug } = await req.json();
        // Step 1: Fetch the URL based on the slug
        const url = await prisma.url.findUnique({
            where: {
                slug: slug,
            },
        });

        if (!url) {
            console.log("Original rot found!");
            return NextResponse.json({ error: "Original rot found!" }, { status: 400 });
        }

        console.log(req.headers);


        // Step 2: Get request data (country, city, device, browser)
        const forwardedFor = req.headers.get("x-forwarded-for") || ""; // Get IP from headers
        const ip = forwardedFor.split(",")[0].trim(); // Use the first IP in the list
        const dataLocation = await getLocationData(ip);

        const userAgentString = req.headers.get("user-agent") || "";  // Extract user-agent string
        const userAgent = parse(userAgentString);

        console.log("IP",forwardedFor,"Geo Info:",dataLocation, "User Agent:", userAgent);

        // Step 3: Record the click
        await prisma.click.create({
            data: {
                urlId: url.id, // Relating the click to the URL
                country: dataLocation?.country || null,
                city: dataLocation?.city || null,
                postalcode: dataLocation?.postal || null,
                device: userAgent.isMobile ? 'Mobile' : userAgent.isTablet ? 'Tablet' : 'Desktop',
                browser: userAgent.browser || null,
                referer: req.headers.get('referer') || null,
            },
        });

        // Step 4: Redirect to the original URL
        return NextResponse.json({ message: 'Click tracked successfully', url: url.originalUrl }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 400 });
    }

}

