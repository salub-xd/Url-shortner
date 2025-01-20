"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import Image from "next/image";

export type UrlColumn = {
    id: string;
    originalUrl: string;
    shortUrl: string;
    slug: string | null; 
    qrCodeUrl: string | null; 
    isProtected: boolean | null;
    name: string | null; 
    expiredAt: string | null;
    createdAt: string;
}

export const columns: ColumnDef<UrlColumn>[] = [
    {
        accessorKey: "originalUrl",
        header: "Original Url",
    },
    {
        accessorKey: "shortUrl",
        header: "Short Url",
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "clicks",
        header: "Clicks",
    },
    {
        accessorKey: "qrCodeUrl",
        header: "Qr Code",
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.original.qrCodeUrl ? (
                    <Image
                        src={row.original.qrCodeUrl}
                        className="rounded border object-cover"
                        alt="Image"
                        width={80}
                        height={80}
                    />
                ) : (
                    <span>No QR Code</span>
                )}
            </div>
        )
    },
    {
        accessorKey: "isProtected",
        header: "Is Password",
    },
    {
        accessorKey: "expiredAt",
        header: "Expires At",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        header: "Actions",
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
