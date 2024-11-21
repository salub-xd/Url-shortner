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
import { useState } from "react"
import { FormError } from "@/components/auth/form-error"
import { useRouter } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

const formSchema = z.object({
  originalUrl: z.string().url().min(2, {
    message: "Original url must be at least 2 characters.",
  }),
  slug: z.string().optional(),
  qrCodeUrl: z.string().optional(),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }).optional().or(z.literal("")),
  expiredAt: z.date().optional(),
})

export default function Home() {

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | undefined>();
  const [showAdvance, setShowAdvance] = useState<boolean>(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      slug: "",
      qrCodeUrl: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);

      const response = await fetch(`/api/url`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          originalUrl: values.originalUrl,
          slug: values.slug,
          password: values.password,
          qrCodeUrl: values.qrCodeUrl,
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
      setLoading(false);
    }

  }
  return (
    <div className="mt-10 max-w-lg mx-4 px-4 py-8  rounded-md sm:mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="originalUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website Url</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {showAdvance ? <>
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name <small>(Optional)</small></FormLabel>
                  <FormControl>
                    <Input placeholder="slug" {...field} />
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
                  <FormLabel>Password <small>(Optional)</small></FormLabel>
                  <FormControl>
                    <Input placeholder="*******" {...field} />
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
          </> : null}
          {isError && <FormError message={isError} />}
          <Button type="submit" disabled={loading}>Create</Button>
          <div className="flex justify-between">

            <Button type="button" onClick={() => setShowAdvance(!showAdvance)} disabled={loading}>{!showAdvance ? "  Show Advanced features" : "Remove Advanced features"}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
