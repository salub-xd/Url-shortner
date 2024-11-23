'use client';

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { useState } from "react"
import { FormError } from "@/components/auth/form-error"
import { useRouter } from "next/navigation"
import { CalendarIcon, Link2, Loader2, QrCode, Settings2, Shield, } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Switch } from '../ui/switch';

const formSchema = z.object({
    originalUrl: z.string().url().min(2, {
        message: "Original url must be at least 2 characters.",
    }),
    slug: z.string().optional(),
    qrCode: z.boolean().optional(),
    password: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }).optional().or(z.literal("")),
    expiredAt: z.date().optional(),
})

export const UrlShortnerForm = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string | undefined>();
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            originalUrl: "",
            slug: "",
            qrCode: false,
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            setIsLoading(true);

            const response = await fetch(`/api/url`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    originalUrl: values.originalUrl,
                    slug: values.slug,
                    password: values.password,
                    qrCode: values.qrCode,
                    expiredAt: values.expiredAt,
                })
            });

            const resData = await response.json();

            // console.log(resData);

            if (resData.error) {
                setIsError(resData.error);
            } else {

                router.push(`/success?slug=${resData.slug}`);
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
            setIsLoading(false);
        }

    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                <FormField
                    control={form.control}
                    name="originalUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter your long URL here..."
                                        {...field}
                                        className="flex-1"
                                    />
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Link2 className="h-4 w-4 mr-2" />
                                                Shorten
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Collapsible
                    open={showAdvanced}
                    onOpenChange={setShowAdvanced}
                    className="space-y-4"
                >
                    <div className="flex items-center justify-between border rounded-md ">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-2 ">
                                <Settings2 className="h-4 w-4" />
                                Advanced Options
                            </Button>
                        </CollapsibleTrigger>
                        <div className="flex items-center gap-2 px-3">
                            <div className="flex items-center">
                                <QrCode className="h-4 w-4 mr-2" />
                                <FormField
                                    control={form.control}
                                    name="qrCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    aria-label="Generate QR Code"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <CollapsibleContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Custom Back-half</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., my-custom-url" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Shield className="h-4 w-4" />
                                        Password Protection
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter password to protect your link"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expiredAt"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Expire At</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Your date of Link expiration.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CollapsibleContent>
                </Collapsible>
                {isError && <FormError message={isError} />}
            </form>
        </Form >
    )
}
