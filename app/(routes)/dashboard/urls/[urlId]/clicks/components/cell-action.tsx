"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ClickColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CellActionProps {
    data: ClickColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Color Id copied to the clipboard.')
    }

    useEffect(() => {
        router.refresh();
    })

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.urlId)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Url Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy(data.shortUrl)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Short Url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}