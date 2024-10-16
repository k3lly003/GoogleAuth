"use client";
import React, { useState, useMemo } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaEdit, FaTrash, FaFileExport, FaPlusCircle } from "react-icons/fa";
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
import { data } from "./data"; // Import your data from data.js
import EditOrder from "./EditOrder"; // Import edit dialog
import DeleteOrder from "./DeleteOrder"; // Import delete dialog
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Stock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const row = [];

    // Manually define the table headers, excluding "Action"
    const tableHeaders = ["ID", "Name", "Location", "Size", "Entry Date", "Status"];

    // Populate the table rows with data, excluding the "Action" column
    data.forEach((item) => {
      const rowData = [item.id, item.name, item.location, item.size, item.entryDate, item.status];
      row.push(rowData);
    });

    doc.autoTable({
      head: [tableHeaders],
      body: row,
    });

    doc.save("Purchase order.pdf"); // Trigger file download
  };

  const handleEditOpen = (order) => {
    setSelectedOrder(order);
    setEditOpen(true);
  };

  const handleDeleteOpen = (order) => {
    setSelectedOrder(order);
    setDeleteOpen(true);
  };

  const handleSave = (updatedOrder) => {
    console.log("Saved order: ", updatedOrder);
    setEditOpen(false); // Close dialog after save
  };

  const handleDelete = (orderId) => {
    console.log("Deleted order ID: ", orderId);
    setDeleteOpen(false); // Close dialog after delete
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "" || item.status === categoryFilter)
    );
  }, [searchTerm, categoryFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: [
      {
        accessorKey: "id",
        header: () => <div className="text-left">ID</div>,
        cell: ({ row }) => <div className="">{row.original.id}</div>,
      },
      {
        accessorKey: "name",
        header: () => <div className="text-left">Name</div>,
        cell: ({ row }) => <div className="">{row.original.name}</div>,
      },
      {
        accessorKey: "location",
        header: () => <div className="text-left">Location</div>,
        cell: ({ row }) => <div className="">{row.original.location}</div>,
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
        accessorKey: "status",
        header: () => <div className="text-left">Status</div>,
        cell: ({ row }) => (
          <div
            className={` ${
              row.original.status === "Denied"
                ? "text-red-600"
                : row.original.status === "Approved"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {row.original.status}
          </div>
        ),
      },
      {
        accessorKey: "action",
        header: () => <div className="text-left">Action</div>,
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button onClick={() => handleEditOpen(row.original)}>
              <FaEdit className="text-green-600" />
            </button>
            <button onClick={() => handleDeleteOpen(row.original)}>
              <FaTrash className="text-red-600" />
            </button>
          </div>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div className="w-full px-6">
      {/* Search, filter, and action buttons */}
      <div className="flex items-center justify-between mt-4 mb-2">
        <div>
          <p className="py-6 text-md font-semibold">Purchase orders</p>
        </div>

        <div className="flex items-center  max-w-lg">
          <div className="relative w-full">
            <HiOutlineSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border pl-10 pr-20 rounded-md py-2 w-full"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <select
            className="border px-1 text-[15px] py-2 rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Filter Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Denied">Denied</option>
          </select>

          <button
            onClick={handleExportPDF}
            className="flex items-center text-[15px] px-1 py-2 border rounded-md bg-white"
          >
            <FaFileExport className="mr-1" /> Export
          </button>

          <a href="purchaseOrder/purchase-new">
            <button className="flex items-center px-1 py-2 text-[15px] border rounded-md bg-green-600 text-white">
              <FaPlusCircle className="mr-1" /> Purchase New
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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  No results.
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

      {/* Edit and Delete Modals */}
      {isEditOpen && (
        <EditOrder
          order={selectedOrder}
          isOpen={isEditOpen}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}
      {isDeleteOpen && (
        <DeleteOrder
          order={selectedOrder}
          isOpen={isDeleteOpen}
          onClose={() => setDeleteOpen(false)}
          onDelete={handleDelete}  
        />
      )}
    </div>
  );
}
