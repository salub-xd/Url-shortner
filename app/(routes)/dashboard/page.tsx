"use client";

import { useState } from "react";
import { BarChart3, Copy, ExternalLink, Link, MoreVertical, Pencil, QrCode, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// import { AlertModal } from "@/components/ui/alert-modal";
// import { URLDialog } from "@/components/url-dialog";
// import { URLData } from "@/types/url";

export default function DashboardPage() {
    const { toast } = useToast();
    const [urls, setUrls] = useState<URLData[]>([
        {
            id: "1",
            originalUrl: "https://example.com/very/long/url/that/needs/shortening",
            shortUrl: "short.ly/abc123",
            clicks: 1234,
            createdAt: "2024-02-20",
        },
        {
            id: "2",
            originalUrl: "https://another-example.com/path/to/page",
            shortUrl: "short.ly/xyz789",
            clicks: 567,
            createdAt: "2024-02-19",
        },
    ]);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [urlToDelete, setUrlToDelete] = useState<string | null>(null);
    const [editingUrl, setEditingUrl] = useState<URLData | null>(null);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: "URL copied to clipboard",
        });
    };

    const handleDelete = (id: string) => {
        setUrlToDelete(id);
        setIsDeleteOpen(true);
    };

    const confirmDelete = () => {
        if (urlToDelete) {
            setUrls(urls.filter(url => url.id !== urlToDelete));
            toast({
                title: "URL Deleted",
                description: "The URL has been successfully deleted.",
            });
            setIsDeleteOpen(false);
            setUrlToDelete(null);
        }
    };

    const handleSave = (data: { originalUrl: string; customSlug: string }) => {
        if (editingUrl) {
            // Edit existing URL
            setUrls(urls.map(url =>
                url.id === editingUrl.id
                    ? {
                        ...url,
                        originalUrl: data.originalUrl,
                        shortUrl: `short.ly/${data.customSlug}`,
                    }
                    : url
            ));
            toast({
                title: "URL Updated",
                description: "The URL has been successfully updated.",
            });
            setEditingUrl(null);
        } else {
            // Add new URL
            const newId = (Math.max(...urls.map(url => parseInt(url.id))) + 1).toString();
            setUrls([...urls, {
                id: newId,
                originalUrl: data.originalUrl,
                shortUrl: `short.ly/${data.customSlug || Math.random().toString(36).substring(7)}`,
                clicks: 0,
                createdAt: new Date().toISOString().split('T')[0],
            }]);
            toast({
                title: "URL Created",
                description: "The new URL has been successfully created.",
            });
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                {/* <URLDialog editingUrl={null} onSave={handleSave} /> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total URLs</CardTitle>
                        <Link className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{urls.length}</div>
                        <p className="text-xs text-muted-foreground">+5 from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {urls.reduce((sum, url) => sum + url.clicks, 0)}
                        </div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Links</CardTitle>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{urls.length}</div>
                        <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">QR Codes</CardTitle>
                        <QrCode className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-muted-foreground">Generated this month</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="all">All URLs</TabsTrigger>
                        <TabsTrigger value="recent">Recent</TabsTrigger>
                        <TabsTrigger value="popular">Popular</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center space-x-2">
                        <Input
                            placeholder="Search URLs..."
                            className="w-[300px]"
                        />
                    </div>
                </div>

                <TabsContent value="all" className="space-y-4">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Original URL</TableHead>
                                    <TableHead>Short URL</TableHead>
                                    <TableHead className="text-right">Clicks</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {urls.map((url) => (
                                    <TableRow key={url.id}>
                                        <TableCell className="font-medium max-w-[300px] truncate">
                                            {url.originalUrl}
                                        </TableCell>
                                        <TableCell>{url.shortUrl}</TableCell>
                                        <TableCell className="text-right">{url.clicks}</TableCell>
                                        <TableCell>{url.createdAt}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => copyToClipboard(url.shortUrl)}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <QrCode className="h-4 w-4" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {/* <URLDialog 
                              editingUrl={url} 
                              onSave={handleSave}
                            >
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            </URLDialog> */}
                                                        <DropdownMenuItem
                                                            className="text-destructive"
                                                            onSelect={() => handleDelete(url.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>

            {/* <AlertModal isOpen= onClose={function (): void {
                throw new Error("Function not implemented.");
            } } onConfirm={function (): void {
                throw new Error("Function not implemented.");
            } } loading={false} /> */}

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the URL
                            and remove it from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}