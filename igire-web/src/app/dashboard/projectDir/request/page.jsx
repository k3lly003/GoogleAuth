"use client";

import * as React from "react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { HiOutlineSearch } from "react-icons/hi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import PurchaseRequestModal from "./purchaseRequestModal";
import DeniedOrderModal from "./deniedOrderModal";

const data = [
  {
    date: "21 Oct, 2024",
    product: "Table",
    quantity: 5,
    amountPerUnit: 25000,
    totalAmount: 125000,
    status: "Pending",
  },
  {
    date: "22 Oct, 2024",
    product: "Chair",
    quantity: 5,
    amountPerUnit: 10000,
    totalAmount: 100000,
    status: "Pending",
  },
  {
    date: "23 Oct, 2024",
    product: "Mark board",
    quantity: 2,
    amountPerUnit: 5000,
    totalAmount: 10000,
    status: "Pending",
  },
  {
    date: "24 Oct, 2024",
    product: "Kettle",
    quantity: 2,
    amountPerUnit: 70000,
    totalAmount: 140000,
    status: "Pending",
  },
  {
    date: "25 Oct, 2024",
    product: "Kettle",
    quantity: 2,
    amountPerUnit: 70000,
    totalAmount: 140000,
    status: "Pending",
  },
];

const deniedData = [
  {
    date: "20 Oct, 2024",
    product: "Dust bin",
    quantity: 3,
    amountPerUnit: 7000,
    totalAmount: 21000,
    status: "Denied",
  },
  {
    date: "18 Oct, 2024",
    product: "Laptop",
    quantity: 1,
    amountPerUnit: 200000,
    totalAmount: 200000,
    status: "Denied",
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
      if (status === "Denied") statusClass = "text-red-500";

      return <div className={statusClass}>{status}</div>;
    },
  },
];

export default function Request() {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [isRequisitionModalOpen, setIsRequisitionModalOpen] = React.useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = React.useState(false);
  const [deniedSorting, setDeniedSorting] = React.useState([]);
  const [deniedGlobalFilter, setDeniedGlobalFilter] = React.useState("");

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

  const deniedTable = useReactTable({
    data: deniedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setDeniedSorting,
    state: {
      sorting: deniedSorting,
      globalFilter: deniedGlobalFilter,
    },
  });

  const handleRequisitionRowClick = (row) => {
    setIsRequisitionModalOpen(true);
  };

  const handleDeclineRowClick = (row) => {
    setIsDeclineModalOpen(true);
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

      <div className="flex items-center justify-between mt-4 mb-3">
        <h1 className="text-md font-semibold">Order Decline</h1>
        <div className="flex items-center">
          <div className="relative w-80">
            <Input
              placeholder="Search by product..."
              value={deniedGlobalFilter}
              onChange={(event) => setDeniedGlobalFilter(event.target.value)}
              className="pl-10"
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" size={15} />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#EFF4FA]">
            {deniedTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {deniedTable.getRowModel().rows?.length ? (
              deniedTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id} onClick={() => handleDeclineRowClick(row)}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

      <PurchaseRequestModal
        isOpen={isRequisitionModalOpen}
        onClose={() => setIsRequisitionModalOpen(false)}
      />
      <DeniedOrderModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
      />
    </div>
  );
}
