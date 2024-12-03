import React from 'react'
import { UrlForm } from './components/url-form';
import {prisma} from '@/lib/prisma';

const UrlPage = async ({
  params }: {
    params: { urlId: string }
  }) => {

  let url;

  if (params.urlId !== 'new') {
    url = await prisma.url.findUnique({
      where: {
        id: params.urlId
      },
    });
  }


  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <UrlForm
          initialData={url}
        />
      </div>
    </div>
  )
}

export default UrlPage;
