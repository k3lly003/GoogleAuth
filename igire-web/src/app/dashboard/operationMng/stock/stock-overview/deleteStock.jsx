"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoWarning } from "react-icons/io5";

export default function DeleteStock({ open, onOpenChange, onDelete, onClose }) {
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Delete Product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <p>Are you sure you want to delete this product?</p>
          <div className="flex items-center text-red-500">
            <IoWarning className="mr-2" size={24} />
            <p className="text-sm">: This action cannot be undone!</p>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button onClick={onDelete} className="bg-red-500 text-white px-4 py-2">Yes, Delete</Button>
          <Button onClick={onClose} className="bg-gray-300 px-4 py-2">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
