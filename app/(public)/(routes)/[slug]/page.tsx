'use server';

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
// import { redirect } from "next/navigation";
import { Url } from '@prisma/client';
import { FormPassword } from "./_components/form-password";
import { Click } from "./_components/click";

export default async function Slug({ params }: { params: { slug: string } }) {

  const url: Url | null = await prisma.url.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!url || !url.originalUrl) {
    return (
      <div className="flex justify-center items-center flex-col mx-5 text-red-600 text-sm md:text-lg h-screen">
        <h1>Error</h1>
        <p>The requested URL could not be found. Please check and try again.</p>
        <Link href={'/'} className="mt-4">
          <Button>Home</Button>
        </Link>
      </div>
    );
  }
  // // Redirect to the found URL
  if (!url.isProtected) {
    return (
      <>
        <Click slug={url.slug as string} />
      </>
    );
  }
  else {
    return (
      <>
        <FormPassword slug={params.slug} />
      </>
    );
  }

}
