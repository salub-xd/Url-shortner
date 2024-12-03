"use client";

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

export type ClickColumn = {
    id: string;
    urlId: string
    originalUrl: string,
    shortUrl: string,
    country: string | null;
    city: string | null;
    postalcode: string | null;
    device: string | null;
    browser: string | null;
    referer: string | null;
    clickAt: string | null;
}

export const columns: ColumnDef<ClickColumn>[] = [
    {
        accessorKey: "id",
        header: "Click id",
    },
    {
        accessorKey: "urlId",
        header: "Url Id",
    },
    {
        accessorKey: "originalUrl",
        header: "Original Url",
    },
    {
        accessorKey: "shortUrl",
        header: "Short Url",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "postalcode",
        header: "Postal Code",
    },
    {
        accessorKey: "device",
        header: "Device",
    },
    {
        accessorKey: "browser",
        header: "Browser",
    },
    {
        accessorKey: "referer",
        header: "Referer",
    },
    {
        accessorKey: "clickAt",
        header: "Clicked At",
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
