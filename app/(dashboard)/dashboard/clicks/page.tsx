import React from 'react';
import { ClickClient } from './components/client';
import { ClickColumn } from './components/columns';
import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

const ClicksPage = async () => {

  const session = await auth();
  const userId = session?.user.id;

  const clicks = await prisma.click.findMany({
    where: {
      userId,
    },
    include: {
      url: true
    },
    orderBy: {
      clickAt: 'desc'
    }
  });

  const formattedClicks: ClickColumn[] = clicks?.map((click) => ({
    id: click.id,
    urlId: click.urlId,
    originalUrl: click.url.originalUrl,
    shortUrl: click.url.shortUrl,
    country: click.country,
    city: click.city,
    postalcode: click.postalcode,
    device: click.device,
    browser: click.browser,
    referer: click.referer,
    clickAt: click.clickAt ? format(click.clickAt, 'HH:mm MMMM do,yyyy') : null,
  }))


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ClickClient data={formattedClicks} />
      </div>
    </div>
  )
}

export default ClicksPage;
