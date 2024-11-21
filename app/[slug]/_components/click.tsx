"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const Click = ({ slug }: { slug: string }) => {

    const router = useRouter();

    useEffect(() => {
        const click = async () => {
            const res = await fetch(`/api/click`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slug: slug }),
            });

            const resData = await res.json();
            router.push(`${resData.url}`);

        }

        click()
    }, [slug,router])

    return null;
}

