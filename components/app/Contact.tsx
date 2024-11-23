"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "../auth/form-error";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export default function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | undefined>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            setIsLoading(true);
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
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                        Have questions? We are here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Mail className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="font-medium">Email</h3>
                                    <p className="text-muted-foreground">support@example.com</p>
                                </div>
                            </div>
                            {/* <div className="flex items-center gap-4">
                                <Phone className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="font-medium">Phone</h3>
                                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MessageSquare className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="font-medium">Live Chat</h3>
                                    <p className="text-muted-foreground">Available 24/7</p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="How can we help?"
                                                    className="min-h-[120px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    ) : null}
                                    Send Message
                                </Button>
                            </form>
                            {isError && <FormError message={isError} />}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}