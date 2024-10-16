"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function EditStock({ open, onOpenChange, selectedRowData, onSave }) {
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form>
          {/* Form fields for editing */}
          <div className="grid text-gray-700 gap-4">
            <label>
              Product:
              <input
                type="text"
                value={selectedRowData?.product || ""}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
            <label>
              Brand:
              <input
                type="text"
                value={selectedRowData?.brand || ""}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={selectedRowData?.location || ""}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
            <label>
              Size:
              <input
                type="text"
                value={selectedRowData?.size || ""}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
            <label>
              Additional Specification:
              <input
                type="text"
                value={selectedRowData?.additionalSpecific || ""}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
          </div>
        </form>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="bg-gray-300">Cancel</Button>
          <Button type="submit" onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
