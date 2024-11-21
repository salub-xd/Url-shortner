import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req: Request) {

    try {

        const { slug, password } = await req.json();
        console.log(slug, password);

        // Check if slug is already taken
        if (!slug || !password) {
            return NextResponse.json({ error: "Enter required fields!" }, { status: 400 });
        }

        const existing = await prisma.url.findUnique({ where: { slug } });

        if (!existing) {
            return NextResponse.json({ error: "Invalid Url1" }, { status: 400 });
        }

        const hashPassword = await bcrypt.compare(password, existing.password!);
        
        if (!hashPassword) {
            return NextResponse.json({ error: "Invalid Password!" }, { status: 400 });
        }

        return NextResponse.json(existing, { status: 200 });

    } catch (error: unknown) {
        console.log("Url/Protected api Error : ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }

}

