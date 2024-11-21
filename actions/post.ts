"use server";

import { z } from "zod";
import { PostSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserByEmail, getUserById } from '@/lib/user';

export const post = async (values: z.infer<typeof PostSchema>) => {

    const validatedFields = PostSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { title, image } = validatedFields.data;

    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized!" }
    }

    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    // const post = await db.product.create({
    //     data: {
    //         title,
    //         image,
    //         userId: user.id,
    //     }
    // })

    return { success: "Post created!" }

} 