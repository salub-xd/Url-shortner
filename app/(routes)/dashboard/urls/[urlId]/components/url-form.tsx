"use client";

import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator"
// import { Url } from "@prisma/client";
import { CalendarIcon, Trash } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from "@/components/ui/alert-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { FormError } from '@/components/auth/form-error';

interface UrlFormProps {
    initialData: UrlProps | null | undefined;
}

export type UrlProps = {
    id: string;
    originalUrl: string;
    shortUrl: string;
    slug: string | null;
    qrCodeUrl: string | null;
    isProtected: boolean | null;
    password: string | null;
    userId: string | null;
    expiredAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const formSchema = z.object({
    originalUrl: z.string().url(),
    slug: z.string().min(3, {
        message: "Slug must be at least 3 characters.",
    }).optional().or(z.literal("")),
    qrCodeUrl: z.string().optional(),
    password: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }).optional().or(z.literal("")),
    expiredAt: z.date().optional(),
});

type UrlFormValues = z.infer<typeof formSchema>

export const UrlForm: React.FC<UrlFormProps> = ({
    initialData,
}) => {

    const { toast } = useToast();
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const [qrCode, setQrCode] = useState(!!initialData?.qrCodeUrl); // Use the initial value if editing

    const form = useForm<UrlFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                originalUrl: initialData.originalUrl ?? '',
                slug: initialData.slug ?? '',
                password: initialData.password ?? '',
                qrCodeUrl: initialData.qrCodeUrl ?? '',
                expiredAt: initialData.expiredAt ?? undefined,
            }
            : {
                originalUrl: '',
                slug: '',
                password: '',
            },
    });

    const title = initialData ? 'Edit Post' : 'Create Post';
    const description = initialData ? 'Edit a Post' : 'Add a new Post';
    const toastMessage = initialData ? "Post updated." : "Post created.";
    const action = initialData ? "Save changes" : "Create Post";

    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        try {
            setLoading(true);
            const payload = { ...data, qrCode: qrCode ? true : false };
            if (initialData) {
                await axios.patch(`/api/url/${params.urlId}`, payload)
            } else {
                await axios.post(`/api/url`, data)
            }
            toast({ title: toastMessage });
            router.refresh();
            router.push('/dashboard/posts');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // AxiosError has response and data properties
                setIsError(error.response?.data?.message || "An error occurred");
                toast({
                    title: "Something went wrong",
                    description: error.response?.data?.message || "An unexpected error occurred"
                });
            } else {
                // Generic error handling for other error types
                setIsError("An unexpected error occurred");
                toast({
                    title: "Something went wrong",
                    description: "An unexpected error occurred"
                });
            }
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/url/${params.urlId}`);
            router.refresh();
            router.push('/dashboard/posts')
            toast({ title: 'Url deleted' });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // AxiosError has response and data properties
                setIsError(error.response?.data?.message || "An error occurred");
                toast({
                    title: "Something went wrong",
                    description: error.response?.data?.message || "An unexpected error occurred"
                });
            } else {
                // Generic error handling for other error types
                setIsError("An unexpected error occurred");
                toast({
                    title: "Something went wrong",
                    description: "An unexpected error occurred"
                });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData &&
                    <Button
                        disabled={loading}
                        variant={'destructive'}
                        size={'icon'}
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                        <FormField
                            control={form.control}
                            name='originalUrl'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Original Url</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Enter your long URL here...' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='slug'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug (optional)</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="e.g., my-custom-url" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Protection (optional)</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Enter password to protect your link' {...field} />
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
                                    <FormLabel>Expire At (optional)</FormLabel>
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
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow">
                            <FormLabel className="flex items-center gap-x-2">
                                Qr Code (optional)
                            </FormLabel>
                            <FormControl>
                                <Checkbox
                                    checked={qrCode}
                                    onCheckedChange={(value: boolean) => setQrCode(value)}
                                />
                            </FormControl>
                        </FormItem>
                    </div>
                    <FormError message={isError} />
                    <Button disabled={loading} className='ml-auto' type='submit'>{action}</Button>
                </form>
            </Form>
            <Separator />

        </>
    )
}