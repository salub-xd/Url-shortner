'use client';
import { CldUploadWidget } from 'next-cloudinary';

import React, { useEffect, useState } from 'react'
import { Button } from './button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    disabeld?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabeld,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className='mb-4 flex items-center gap-4'>
                {value.map((url) => (
                    <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                        <div className='z-10 absolute top-1 right-1'>
                            <Button size={'icon'} variant={'destructive'} onClick={() => onRemove(url)}>
                                <Trash className='w-4 h-4' />
                            </Button>
                        </div>
                        <Image
                            src={url}
                            className='object-cover'
                            fill
                            alt='Image'
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onUpload} uploadPreset="ilsye7yf">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }
                    return (
                        <Button type={'button'} onClick={onClick} variant={'secondary'} disabled={disabeld}>
                            <ImagePlus className='mr-2 w-4 h-4' />
                            Upload a Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload;
