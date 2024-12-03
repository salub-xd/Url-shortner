"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UrlColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, Link, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/ui/alert-modal";
import { useToast } from "@/hooks/use-toast";

interface CellActionProps {
    data: UrlColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({ title: 'Url Id copied to the clipboard.' });
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/url/${data.id}`);
            router.refresh();
            // router.push('/')
            toast({ title: "Url Deleted Successfully" });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // AxiosError has response and data properties
                toast({
                    title: "Something went wrong",
                    description: error.response?.data?.message || "An unexpected error occurred"
                });
            } else {
                toast({
                    title: "Something went wrong",
                    description: "An unexpected error occurred"
                });
            }
        } finally {
            setLoading(false);
            setOpen(false)
        }
    }

    const handleDownloadQrCode = () => {
        const qrCodeUrl = data.qrCodeUrl;
        // Check if qrCodeUrl is not null before proceeding
        if (qrCodeUrl) {
            const link = document.createElement("a");
            link.href = qrCodeUrl; // Set the href to the Base64 string
            link.download = "QRCode.png"; // Set the file name for the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up after download
        } else {
            toast({ title: "QR Code not available" });
        }
    };

    useEffect(() => {
        router.refresh();

    })

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
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
                    <DropdownMenuItem onClick={() => onCopy(data.shortUrl)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Url
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDownloadQrCode}>
                        <Copy className="mr-2 h-4 w-4" />
                        Download Qr Code
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/urls/${data.id}/clicks`)}>
                        <Link className="mr-2 h-4 w-4" />
                        View Url Clicks
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/urls/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}