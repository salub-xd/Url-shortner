import {prisma} from "@/lib/prisma"

export const getUrlsCount = async (userId: string) => {

    const selesCount = await prisma.url.count({
        where: {
            userId,
        },
    })

    return selesCount;

}