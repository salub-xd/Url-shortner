"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { FormError } from "@/components/auth/form-error"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    slug: z.string().optional(),
    password: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }),
})

export function FormPassword({ slug }: { slug: string }) {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string | undefined>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: slug,
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            setLoading(true);

            const response = await fetch(`/api/url/protected`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    slug: values.slug,
                    password: values.password,
                })
            });

            const resData = await response.json();

            if (resData.error) {
                setIsError(resData.error);
            } else {
                router.push(`${resData.originalUrl}`);
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message); // Access the error message safely
                setIsError(error.message); // Use the error message, which is a string
            } else {
                console.log('An unexpected error occurred');
                setIsError('An unexpected error occurred'); // Provide a fallback error message
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const click = async () => {
            await fetch(`/api/click`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slug: slug }),
            });
        }

        click()
    }, [slug, router])

    return (
        <div className="mt-10 max-w-lg mx-4 px-4 py-8  rounded-md sm:mx-auto">
            <h1>Url Protected</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" {...field} />
                                </FormControl>
                                <FormDescription>Enter password to redirected to original url!</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isError && <FormError message={isError} />}
                    <Button type="submit" disabled={loading}>Submit</Button>
                </form>
            </Form>
        </div>
    )
}
