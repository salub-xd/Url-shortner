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
import { Copy, Link, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface CellActionProps {
    data: ClickColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const { toast } = useToast();

    const router = useRouter();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({ title: 'Color Id copied to the clipboard.' });
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
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/urls/${data.urlId}/clicks`)}>
                        <Link className="mr-2 h-4 w-4" />
                        View Url Clicks
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}