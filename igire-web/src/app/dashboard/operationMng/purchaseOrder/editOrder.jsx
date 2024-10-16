import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const EditOrder = ({ isOpen, onClose, onSave, order }) => {
  const [formData, setFormData] = useState(order);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Edit Order</DialogTitle>
        </DialogHeader>
        <div className="grid text-gray-700 gap-4">
          
          <label>Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Order Name"
            className="border px-3 py-2 rounded-md"
          />
          </label>
          
          
          <label>Location:
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border px-3 py-2 rounded-md"
          />
          </label>
          
        
          <label>Size:
          <input
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Size"
            className="border px-3 py-2 rounded-md"
          />
          </label>
          
        </div>
        <DialogFooter className="mt-6">
          <Button onClick={handleSave} className="bg-green-600 text-white px-4 py-2">Save</Button>
          <Button onClick={onClose} className="bg-gray-300 px-4 py-2">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrder;
