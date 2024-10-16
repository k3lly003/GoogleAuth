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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import InitiatePaymentModal from "./initiatePaymentModal";

const firstTableData = [
    {
        date: "20 Oct, 2024",
        product: "Table",
        quantity: 2,
        amountPerUnit: 25000,
        totalAmount: 125000,
        status: "Approved",
    },
    {
        date: "21 Oct, 2024",
        product: "Chair",
        quantity: 5,
        amountPerUnit: 25000,
        totalAmount: 125000,
        status: "Approved",
    },
    {
        date: "23 Oct, 2024",
        product: "Mark board",
        quantity: 1,
        amountPerUnit: 25000,
        totalAmount: 125000,
        status: "Approved",
    },
];

const secondTableData = [
    {
        date: "24 Oct, 2024",
        product: "Table",
        quantity: 5,
        amountPerUnit: 10000,
        totalAmount: 50000,
        status: "Payment loading",
    },
    {
        date: "24 Oct, 2024",
        product: "Mark board",
        quantity: 2,
        amountPerUnit: 5000,
        totalAmount: 10000,
        status: "Payment loading",
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
            if (status === "Approved") statusClass = "text-green-500";
            if (status === "completed") statusClass = "text-blue-500";

            return <div className={statusClass}>{status}</div>;
        },
    },
];

export default function Request() {
    const [sorting, setSorting] = React.useState([]);
    const [globalFilterFirst, setGlobalFilterFirst] = React.useState("");
    const [globalFilterSecond, setGlobalFilterSecond] = React.useState("");
    const [isPaymentModalOpen, setPaymentModalOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const openPaymentModal = (product) => {
        setSelectedProduct(product);
        setPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setPaymentModalOpen(false);
        setSelectedProduct(null);
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
            globalFilter: globalFilterFirst,
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
            globalFilter: globalFilterSecond,
        },
    });

    return (
        <div className="w-full p-6">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-md font-semibold">Validated Order</h1>
                <Input
                    placeholder="Search..."
                    value={globalFilterFirst ?? ""}
                    onChange={(e) => setGlobalFilterFirst(e.target.value)}
                    className="max-w-xs"
                />
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
                                <TableRow
                                    key={row.id}
                                    className="cursor-pointer"
                                    onClick={() => openPaymentModal(row.original)}
                                >
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
                    onClick={() => firstTable.previousPage()}
                    disabled={!firstTable.getCanPreviousPage()}
                >
                    <GrFormPrevious />
                </Button>
                <span>
                    Page {firstTable.getState().pagination.pageIndex + 1} of{" "}
                    {firstTable.getPageCount()}
                </span>
                <Button
                    onClick={() => firstTable.nextPage()}
                    disabled={!firstTable.getCanNextPage()}
                >
                    <GrFormNext />
                </Button>
            </div>

            <div className="mt-6 mb-4 flex justify-between items-center">
                <h2 className="font-semibold">Payment Confirmation Status</h2>
                <Input
                    placeholder="Search..."
                    value={globalFilterSecond ?? ""}
                    onChange={(e) => setGlobalFilterSecond(e.target.value)}
                    className="max-w-xs"
                />
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
                                <TableRow
                                    key={row.id}
                                    className="cursor-pointer"
                                    onClick={() => openPaymentModal(row.original)}
                                >
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
                                    No payment is loading.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-2">
                <Button
                    onClick={() => secondTable.previousPage()}
                    disabled={!secondTable.getCanPreviousPage()}
                >
                    <GrFormPrevious />
                </Button>
                <span>
                    Page {secondTable.getState().pagination.pageIndex + 1} of{" "}
                    {secondTable.getPageCount()}
                </span>
                <Button
                    onClick={() => secondTable.nextPage()}
                    disabled={!secondTable.getCanNextPage()}
                >
                    <GrFormNext />
                </Button>
            </div>

            {isPaymentModalOpen && (
                <InitiatePaymentModal
                    isOpen={isPaymentModalOpen}
                    onClose={closePaymentModal}
                    product={selectedProduct}
                />
            )}
        </div>
    );
}
