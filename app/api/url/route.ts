import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { auth } from "@/auth";
import QRCode from 'qrcode';

export async function POST(req: Request) {

    try {

        const session = await auth();
        const userId = session?.user.id;

        const { originalUrl, slug, expiredAt, password, qrCode } = await req.json();
        console.log(originalUrl, slug, expiredAt, password, qrCode);


        if (!originalUrl) {
            console.log("Original rot found!");
            return NextResponse.json({ error: "Original rot found!" }, { status: 400 });
        }

        // Check if slug is already taken
        if (slug) {
            const existing = await prisma.url.findUnique({ where: { slug } });
            if (existing) {
                return NextResponse.json({ error: "Slug name is already taken!" }, { status: 400 });
            }
        }

        // Hash password if provided
        const hashPassword = password ? await bcrypt.hash(password, 10) : null;

        // Generate shortUrl
        const generatedSlug = slug || nanoid(8);
        const shortUrl = `${process.env.BASE_URL}/${generatedSlug}`;

        const qrCodeUrl = qrCode || await QRCode.toDataURL(shortUrl);

        const createUrl = await prisma.url.create({
            data: {
                originalUrl,
                shortUrl,
                slug: generatedSlug,
                expiredAt: expiredAt || null,
                password: hashPassword,
                isProtected: hashPassword ? true : false,
                userId: userId || null,
                qrCodeUrl: qrCodeUrl,
            }
        });

        console.log(createUrl);
        return NextResponse.json(createUrl);

    } catch (error: unknown) {
        console.log("Url api Error : ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }

}

