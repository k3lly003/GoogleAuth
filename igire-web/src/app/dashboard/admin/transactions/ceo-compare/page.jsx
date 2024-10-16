"use client";

import { HiOutlineSearch } from 'react-icons/hi';
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Datatable } from './datatable';
import { dataComparePurchaseOrder, dataSimilarProducts } from './data';
import { IoClose } from 'react-icons/io5'; // Import a close icon
 

export default function CeoCompare() {

const columnsComparePurchaseOrder = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'dimension',
    header: 'Dimension',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'comment',
    header: 'Comment',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

const columnsSimilarProducts = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'dimension',
    header: 'Dimension',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

  const [isInquireDialogOpen, setIsInquireDialogOpen] = useState(false); 
  const [isDenyDialogOpen, setIsDenyDialogOpen] = useState(false); 
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); 
  const [comment, setComment] = useState("");

  const [searchStatus, setSearchStatus] = useState("");

  const filteredDataSimilarProducts = dataSimilarProducts.filter((product) =>
    product.status.toLowerCase().includes(searchStatus.toLowerCase())
  );

  return (
    <div className="container px-6 pt-4 pb-2">
      <div className=" flex justify-end">
        
        <button
          className="text-black border border-2 border-black py-1 px-2 rounded-md"
          onClick={() => setIsInquireDialogOpen(true)}  
        >
          Inquire
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg mb-[10px]">Compare purchase order with stock</h3>
        <Datatable columns={columnsComparePurchaseOrder} data={dataComparePurchaseOrder} isPaginated={false}/>
      </div>
      <div className="flex justify-end space-x-4 ">
        <button className="bg-green-500 text-white py-1 px-2 rounded-md"
        onClick={() => {
          setIsConfirmDialogOpen(true); // Open confirmation dialog when denied
        }}
      >Approve</button>
        
        <button
          className="bg-red-500 text-white py-1 px-2 rounded-md"
          onClick={() => setIsDenyDialogOpen(true)}  
        >
          Deny
        </button>
      </div>

      <div>
        <div>
          <h3 className="text-lg mb-[10px]">Similar products in stock</h3>
        </div>
        <div className="flex items-center w-full mb-4 max-w-lg">
          <div className="relative w-full">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="filter by status..."
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}  
              className="border bg-gray-100 pl-10 pr-4 rounded-md py-2 w-full"
            />
          </div>
        </div>
        <Datatable columns={columnsSimilarProducts} data={filteredDataSimilarProducts}  isPaginated={true} />
      </div>

      {isInquireDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md relative">
            <button
              className="absolute top-4 right-4 text-red-500"
              onClick={() => setIsInquireDialogOpen(false)}
            >
              <IoClose size={24} />
            </button>

            {/* Dialog Content */}
            <h2 className="text-lg font-semibold mb-4 text-center">Inquire clarification</h2>
            <div className="space-y-4">
              <div>
                <strong>PurchasedId:</strong> Mark board
              </div>
              <div>
                <strong>Name:</strong> Office chair
              </div>
              <div>
                <strong>Location:</strong> Class equipment
              </div>
              <div>
                <label htmlFor="comment" className="block mb-2">Comment</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border border-gray-300 rounded-md w-full p-2"
                  placeholder="Add comment"
                  rows={4}
                />
              </div>
            </div>

            {/* Dialog Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={() => {
                  console.log("Confirmed with comment:", comment);
                  setIsInquireDialogOpen(false);
                }}
              >
                Confirm
              </button>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded-md"
                onClick={() => setIsInquireDialogOpen(false)}
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deny Dialog */}
      {isDenyDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-red-500"
              onClick={() => setIsDenyDialogOpen(false)}
            >
              <IoClose size={24} />
            </button>

            {/* Dialog Content */}
            <h2 className="text-xl font-semibold mb-4 text-center">Deny Purchase</h2>
            <div className="space-y-4">
              <div>
                <strong>PurchasedId:</strong> Mark board
              </div>
              <div>
                <strong>Name:</strong> Office chair
              </div>
              <div>
                <strong>Location:</strong> Class equipment
              </div>
              <div>
                <label htmlFor="comment" className="block mb-2">Comment</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border border-gray-300 rounded-md w-full p-2"
                  placeholder="Add comment"
                  rows={4}
                />
              </div>
            </div>

            {/* Dialog Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={() => {

                  setIsDenyDialogOpen(false);
                }}
              >
                Confirm
              </button>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded-md"
                onClick={() => setIsDenyDialogOpen(false)}
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Denied Purchase */}
      {isConfirmDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-red-500"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              <IoClose size={24} />
            </button>

            {/* Dialog Content */}
            <h2 className="text-xl font-semibold mb-4 text-center">Denied purchase</h2>
            <div className="space-y-4">
              <div>
                <strong>Item:</strong> Mark board
              </div>
              <div>
                <strong>Description:</strong> Lorem ipsum
              </div>
              <div>
                <strong>Category:</strong> Class equipment
              </div>
              <div>
                <strong>Quantity:</strong> 3 pcs
              </div>
              <div>
                <label htmlFor="comment" className="block mb-2">Reason for denial</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border border-gray-300 rounded-md w-full p-2"
                  placeholder="Add comment"
                  rows={4}
                />
              </div>
            </div>

            {/* Dialog Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={() => {
                  console.log("Denied with reason:", comment);
                  setIsConfirmDialogOpen(false);
                }}
              >
                Confirm
              </button>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded-md"
                onClick={() => setIsConfirmDialogOpen(false)}
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

