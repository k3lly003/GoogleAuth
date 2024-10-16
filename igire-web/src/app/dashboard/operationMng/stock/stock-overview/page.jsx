"use client";

import React, { useState, useMemo } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaPlusCircle,FaFileExport } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import EditStock from "./EditStock";
import DeleteStock from "./DeleteStock";
import jsPDF from "jspdf";
import "jspdf-autotable";

const data = [
  {
    product: "Table",
    brand: "Product A",
    location: ["Class 1"],
    size: "Medium",
    entryDate: "2023-09-01",
    additionalSpecific: "None",
    image: "",
  },
  {
    product: "Chair",
    brand: "Product B",
    location: ["Class 2"],
    size: "Small",
    entryDate: "2023-09-10",
    additionalSpecific: "None",
    image: "",
  },
  {
    product: "Table",
    brand: "Product C",
    location: ["Class 2"],
    size: "Large",
    entryDate: "2023-09-15",
    additionalSpecific: "None",
    image: "",
  },
  {
    product: "Chair",
    brand: "Product D",
    location: ["Office"],
    size: "Medium",
    entryDate: "2023-09-20",
    additionalSpecific: "None",
    image: "",
  },
];

export default function Stock() {
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Filter data based on search term and location filter
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.product.toLowerCase().includes(productSearchTerm.toLowerCase()) &&
        (locationFilter === "" || item.location.includes(locationFilter))
    );
  }, [productSearchTerm, locationFilter]);

  const handleExportPDF =()=>{
    const doc = new jsPDF();
    const row = [];

    const tableHeaders =["Product","Brand","Location","Size","Entry date","Additional specification"];
  
    data.forEach((item)=>{
     const rowData =[item.product, item.brand, item.location, item.size, item.entryDate, item.additionalSpecific];
     row.push(rowData);
    }
    );
    doc.autoTable({
      head: [tableHeaders],
      body: row,
    });

    doc.save("Stock.pdf")
  }

  const table = useReactTable({
    data: filteredData,
    columns: [
      {
        accessorKey: "product",
        header: () => <div className="text-left">Product</div>,
        cell: ({ row }) => <div className="">{row.original.product}</div>,
      },
      {
        accessorKey: "brand",
        header: () => <div className="text-left">Brand</div>,
        cell: ({ row }) => <div className="">{row.original.brand}</div>,
      },
      {
        accessorKey: "location",
        header: () => <div className="text-left">Location</div>,
        cell: ({ row }) => <div className="">{row.original.location.join(", ")}</div>,
      },
      {
        accessorKey: "size",
        header: () => <div className="text-left">Size</div>,
        cell: ({ row }) => <div className="">{row.original.size}</div>,
      },
      {
        accessorKey: "entryDate",
        header: () => <div className="text-left">Entry Date</div>,
        cell: ({ row }) => <div className="">{row.original.entryDate}</div>,
      },
      {
        accessorKey: "additionalSpecific",
        header: () => <div className="text-left">Additional specification</div>,
        cell: ({ row }) => <div className="">{row.original.additionalSpecific}</div>,
      },
      {
        accessorKey: "image",
        header: () => <div className="text-left">Image</div>,
        cell: ({ row }) => <div className="">{row.original.brand}</div>,
      },
      {
        id: "actions",
        header: () => <div className="text-left">Actions</div>,
        cell: ({ row }) => (
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <MdMoreHoriz size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedRowData(row.original);
                    setOpenEditDialog(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedRowData(row.original);
                    setOpenDeleteDialog(true);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
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
      {/* Search and Filters */}
      <div className="flex items-center justify-between mt-4 mb-3">
        <div>
          <p className="py-4 text-md font-semibold">Stock Overview</p>
        </div>
        <div className="relative  max-w-lg">
          <HiOutlineSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by product..."
            value={productSearchTerm}
            onChange={(e) => setProductSearchTerm(e.target.value)}
            className="border pl-10 pr-20 rounded-md py-2 w-full"
          />
        </div>

        <div className="flex space-x-2">
          <select
            className="border  px-1 text-[15px] py-2 rounded-md"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">Filter Location</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Office">Office</option>
          </select>

          <button
            onClick={handleExportPDF}
            className="flex items-center text-[15px] px-1 py-2 border rounded-md bg-white"
          >
            <FaFileExport className="mr-1" /> Export
          </button>

          <a href="add-stock">
            <button className="flex items-center px-1 py-2 text-[15px] border rounded-md bg-green-600 text-white">
              <FaPlusCircle className="mr-1" /> Add stock
            </button>
          </a>
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
                <TableCell colSpan={7} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
  <Button
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
    className="px-1 py-1 flex items-center"
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

      {/* Edit Dialog */}
      <EditStock
  open={openEditDialog}
  onOpenChange={setOpenEditDialog}
  selectedRowData={selectedRowData}
  onSave={() => {
    // Save logic goes here
    setOpenEditDialog(false);
  }}
/>

<DeleteStock
  open={openDeleteDialog}
  onOpenChange={setOpenDeleteDialog}
  onDelete={() => {
    // Delete logic goes here
    setOpenDeleteDialog(false);
  }}
/>

    </div>
  );
}
