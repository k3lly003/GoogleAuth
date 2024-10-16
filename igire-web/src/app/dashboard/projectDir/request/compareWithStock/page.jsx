"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ApprovePurchaseModal from "./approveModal";
import DenyPurchaseModal from "./denialModal";
import InquireModal from "./inquireModal";

const firstTableData = [
    {
        id: "4123637",
        product: "Chair",
        dimension: "44.8 x 27",
        location: "office 1",
        brand: "Elabest",
        status: "new",
    },
];

const secondTableData = [
    {
        id: "25024",
        product: "Chair",
        dimension: "3 x 23",
        location: "office 1",
        brand: "silver wood",
        status: "damaged",
    },
    {
        id: "26024",
        product: "Chair",
        dimension: "2 x 23",
        location: "office 2",
        brand: "silver wood",
        status: "Refurbished",
    },
    {
        id: "27024",
        product: "Chair",
        dimension: "1 x 23",
        location: "office 3",
        brand: "silver wood",
        status: "new",
    },
    {
        id: "28024",
        product: "Chair",
        dimension: "1 x 23",
        location: "class 1",
        brand: "silver wood",
        status: "damaged",
    },
    {
        id: "29024",
        product: "Chair",
        dimension: "2 x 23",
        location: "class 2",
        brand: "silver wood",
        status: "new",
    },
];

const columns = [
    {
        accessorKey: "id",
        header: () => "Id",
    },
    {
        accessorKey: "product",
        header: () => "Product",
    },
    {
        accessorKey: "dimension",
        header: () => "Dimension",
    },
    {
        accessorKey: "location",
        header: () => "Location",
    },
    {
        accessorKey: "brand",
        header: () => "Brand",
    },
    {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            let statusClass = "text-yellow-500";
            if (status === "Approved") statusClass = "text-green-500";
            if (status === "Denied") statusClass = "text-red-500";

            return <div className={statusClass}>{status}</div>;
        },
    },
];

export default function Request() {
    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = React.useState(false);
    const [isDenialModalOpen, setIsDenialModalOpen] = React.useState(false);
    const [isInquireModalOpen, setIsInquireModalOpen] = React.useState(false);

    const handleApprove = () => {
        console.log("Purchase approved!");
        setIsApproveModalOpen(false);
    };

    const handleDeny = () => {
        console.log("Purchase denied!");
        setIsDenialModalOpen(false);
    };

    const handleInquire = () => {
        // console.log("Purchase denied!");
        setIsDenialInquireOpen(false);
    };

    const firstTable = useReactTable({
        data: firstTableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
            globalFilter,
        },
    });

    const secondTable = useReactTable({
        data: secondTableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
            globalFilter,
        },
    });

    return (
        <div className="w-full p-6">
            <div className="mb-4 flex justify-between">
                <h1 className="text-md font-semibold">Compare purchase order with stock</h1>
                <Button className="text-white" onClick={() => setIsInquireModalOpen(true)}>
                    Inquire
                </Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-[#EFF4FA]">
                        {firstTable.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {firstTable.getRowModel().rows?.length ? (
                            firstTable.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} onClick={() => setIsAddModalOpen(true)}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <Button className="text-white" onClick={() => setIsApproveModalOpen(true)}>
                    Approve
                </Button>
                <Button className="text-white bg-[#F70E1E] hover:bg-red-800" onClick={() => setIsDenialModalOpen(true)}>
                    Deny
                </Button>
            </div>

            <div className="my-4">
                <h1 className="text-md font-semibold">Compare purchase order with stock</h1>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-[#EFF4FA]">
                        {secondTable.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {secondTable.getRowModel().rows?.length ? (
                            secondTable.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} onClick={() => setIsAddModalOpen(true)}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => secondTable.previousPage()}
                    disabled={!secondTable.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => secondTable.nextPage()}
                    disabled={!secondTable.getCanNextPage()}
                >
                    Next
                </Button>
            </div>

            <ApprovePurchaseModal
                isOpen={isApproveModalOpen}
                onClose={() => setIsApproveModalOpen(false)}
                onApprove={handleApprove}
            />
            <DenyPurchaseModal
                isOpen={isDenialModalOpen} 
                onClose={() => setIsDenialModalOpen(false)}
                onDeny={handleDeny} 
            />
             <InquireModal
                isOpen={isInquireModalOpen} 
                onClose={() => setIsInquireModalOpen(false)}
                onDeny={handleInquire} 
            />
        </div>
    );
}
