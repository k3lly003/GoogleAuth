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
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdOutlineAttachment } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import UploadReceiptModal from "./uploadReceiptModal";
import ReceiptImageModal from "./receiptImageModal";

const data = [
    {
        date: "21 Oct, 2024",
        product: "Table",
        quantity: 5,
        amountPerUnit: 25000,
        totalAmount: 125000,
        status: "Completed",
    },
    {
        date: "22 Oct, 2024",
        product: "Chair",
        quantity: 5,
        amountPerUnit: 10000,
        totalAmount: 100000,
        status: "Completed",
    },
    {
        date: "23 Oct, 2024",
        product: "Mark board",
        quantity: 2,
        amountPerUnit: 5000,
        totalAmount: 10000,
        status: "Completed",
    },
    {
        date: "24 Oct, 2024",
        product: "Kettle",
        quantity: 2,
        amountPerUnit: 70000,
        totalAmount: 140000,
        status: "Completed",
    },
    {
        date: "25 Oct, 2024",
        product: "Kettle",
        quantity: 2,
        amountPerUnit: 70000,
        totalAmount: 140000,
        status: "Completed",
    },
];

const columns = [
    {
        accessorKey: "date",
        header: () => "Date",
    },
    {
        accessorKey: "product",
        header: () => "Product",
    },
    {
        accessorKey: "quantity",
        header: () => "Quantity",
    },
    {
        accessorKey: "amountPerUnit",
        header: () => "Amount per Unit",
        cell: ({ row }) => {
            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "RWF",
            }).format(row.getValue("amountPerUnit"));
            return <div>{formattedAmount}</div>;
        },
    },
    {
        accessorKey: "totalAmount",
        header: () => "Total Amount",
        cell: ({ row }) => {
            const formattedTotal = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "RWF",
            }).format(row.getValue("totalAmount"));
            return <div>{formattedTotal}</div>;
        },
    },
    {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            let statusClass = "text-yellow-500";
            if (status === "Completed") statusClass = "text-blue-500";

            return <div className={statusClass}>{status}</div>;
        },
    },
    {
        accessorKey: "invoice",
        header: () => "Invoice",
        cell: ({ row }) => {
            const imageUrl = row.getValue("imageUrl");
            return (
                <button
                    onClick={() => openImageModal(imageUrl)}
                    className="text-blue-500 hover:underline"
                >
                    <MdOutlineAttachment />
                </button>
            );
        },
    },
];

export default function Request() {
    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [isUploadReceiptModalOpen, setIsUploadReceiptModalOpen] = React.useState(false);
    const [isReceiptImageModalOpen, setIsReceiptImageModalOpen] = React.useState(false);

    const table = useReactTable({
        data,
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

    const handleRequisitionRowClick = (row) => {
        setIsReceiptImageModalOpen(true);
    };

    const handleUploadReceipt = () => {
        setIsUploadReceiptModalOpen(true);
    };

    return (
        <div className="w-full p-6">
            <div className="flex items-center justify-between mb-3">
                <h1 className="text-md font-semibold">Order requisition</h1>
                <div className="relative w-80 ">
                    <Input
                        placeholder="Search by product..."
                        value={globalFilter}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="pl-10"
                    />
                    <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <span
                    className='flex'
                    onClick={() => handleUploadReceipt()}
                >
                    <Button className="">
                        Upload Receipt
                    </Button>
                </span>

            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-[#EFF4FA]">
                        {table.getHeaderGroups().map((headerGroup) => (
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
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} onClick={() => handleRequisitionRowClick(row)}>
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
            <div className="flex items-center justify-end space-x-2 py-2">
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <GrFormPrevious />
                </Button>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <GrFormNext />
                </Button>
            </div>

            <UploadReceiptModal
                isOpen={isUploadReceiptModalOpen}
                onClose={() => setIsUploadReceiptModalOpen(false)}
            />
            <ReceiptImageModal
                isOpen={isReceiptImageModalOpen}
                onClose={() => setIsReceiptImageModalOpen(false)}
            />
        </div>
    );
}
