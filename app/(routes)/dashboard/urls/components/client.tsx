'use client';

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { UrlColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface UrlClientProps {
    data: UrlColumn[];
}

export const UrlClient: React.FC<UrlClientProps> = ({
    data
}) => {

    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Urls (${data.length})`}
                    description="Manage Url preferences"
                />
                <Button
                    onClick={() => router.push(`/dashboard/urls/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Url
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey={"slug"} />
        </>
    )
}
