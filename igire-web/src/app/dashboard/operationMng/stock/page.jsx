
"use client";
import React, { useState, useMemo } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaPlusCircle} from "react-icons/fa";
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
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
const data = [
  { product: "table", category: "class supplies", quantity: 15 },
  { product: "chair", category: "office supplies", quantity: 20 },
  { product: "plastic chair", category: "class supplies", quantity: 20 },
  { product: "laronge", category: "class supplies", quantity: 5 },
  { product: "m5gr84i9", category: "office supplies", quantity: 1 },
];
const columns = [
  {
    accessorKey: "product",
    header: () => <div className="text-left">Product</div>,
    cell: ({ row }) => <div className="">{row.original.product}</div>,
  },
  {
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => <div className="">{row.original.category}</div>,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-left">Quantity</div>,
    cell: ({ row }) => <div className="">{row.original.quantity}</div>,
  },
   
];
export default function CeoStock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  // Filter data based on search term and category
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
        pageSize: 5, // Set the number of rows per page
      },
    },
  });
  return (
    <div className="w-full px-6">
      <div className="flex items-center justify-between mt-4 mb-3">
      <div>
        <p className="py-4 text-md font-semibold">Stock overview</p>
      </div>
        <div className="flex items-center max-w-lg">
          <div className="relative w-full">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border pl-10 pr-20 rounded-md py-2 w-full"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          
          <div>
          <select
            className="border text-[15px] border-3  px-1 py-2 rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Filter Category</option>
            <option value="class supplies">Class Supplies</option>
            <option value="office supplies">Office Supplies</option>
          </select>
          </div>
          <div>
          <a href="stock/add-stock">
            <button
              className="flex items-center px-1 py-2 text-[15px] border rounded-md bg-green-600 text-white"
            >
              <FaPlusCircle className="mr-1" /> Add stock
            </button>
          </a>
          </div>
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
      <div className="flex items-center justify-end mt-4">
  <Button
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
    className="px-1  flex items-center"
  >
    <BiChevronLeft size={20} className="" />
  </Button>
  <span className="mx-2">
    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
  </span>
  
  <Button
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
    className="px-1 py-1 flex items-center"
  >
    <BiChevronRight size={20} className="" />
  </Button>
</div>
      <div className="py-6 font-semibold text-green-900">
      <a href="stock/stock-overview">
      click here for more details
      </a>
      </div>
    </div>
  );
}