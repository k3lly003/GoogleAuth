"use client";
import React, { useState, useMemo } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const data = [
  { product: "Table", category: "class supplies", quantity: 15 },
  { product: "Chair", category: "office supplies", quantity: 20 },
  { product: "Plastic chair", category: "class supplies", quantity: 20 },
  { product: "Laronge", category: "class supplies", quantity: 5 },
  { product: "M5gr84i9", category: "office supplies", quantity: 1 },
];
const columns = [
  {
    accessorKey: "product",
    header: () => <div className="text-left">Product</div>,
    cell: ({ row }) => <div className="py-1">{row.original.product}</div>,
  },
  {
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => <div className="py-1">{row.original.category}</div>,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-left">Quantity</div>,
    cell: ({ row }) => <div className="py-1">{row.original.quantity}</div>,
  },
];
export default function Stock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "" || item.category === categoryFilter)
    );
  }, [searchTerm, categoryFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });
  return (
    <div className="w-full px-6">
      <div className="flex  flex-col md:flex-row lg:items-center md:items-start justify-between gap-4 mb-4 mt-4">
        <div>
          <p className="font-semibold">Stock overview</p>
        </div>
        <div className="flex items-center max-w-sm">
          <div className="relative w-80">
            <Input
              placeholder="Search by product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" size={15} />
          </div>
        </div>
        <div>
          <select
            className="border border-3 px-3 py-2 text-sm rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Filter By Category</option>
            <option value="class supplies">Class Supplies</option>
            <option value="office supplies">Office Supplies</option>
          </select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#EFF4FA]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
      <div className="flex items-center justify-end space-x-2 mt-4">
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
    </div>
  );
}



