'use client';

import { Heading } from "@/components/ui/heading"
import { ClickColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ClickClientProps {
    data: ClickColumn[];
}

export const ClickClient: React.FC<ClickClientProps> = ({
    data
}) => {


    // const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Clicks (${data.length})`}
                    description="Manage clicks preferences"
                />
              
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey={"label"} />
            <Separator />
        </>
    )
}
