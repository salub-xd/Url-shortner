import React from 'react';
import { UrlClient } from './components/client';
import { UrlColumn } from './components/columns';
import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const UrlPage = async () => {

  const session = await auth();

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user.id
    }
  });

  if (!user) {
    redirect('/login');
  }

  const urls = await prisma.url.findMany({
    where:{
      userId:user.id,
    },
    include: {
      clicks: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedUrls:UrlColumn[] = urls?.map((url) => ({
    id: url.id,
    userId: url.userId,
    originalUrl: url.originalUrl,
    shortUrl: url.shortUrl,
    slug: url.slug,
    qrCodeUrl: url.qrCodeUrl,
    isProtected: url.isProtected,
    name: url.userId,
    expiredAt: url?.expiredAt ? format(url?.expiredAt , 'MMMM do,yyyy') : null,
    createdAt: format(url.createdAt, 'MMMM do,yyyy'),
    clicks:url.clicks.length,
  }))


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <UrlClient data={formattedUrls} />
      </div>
    </div>
  )
}

export default UrlPage;
