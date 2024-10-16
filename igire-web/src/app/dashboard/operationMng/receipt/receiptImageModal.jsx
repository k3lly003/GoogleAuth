import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ReceiptImageModal = ({ isOpen, imageUrl, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-white p-6 rounded-xl shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-center text-lg font-bold">Receipt Image</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center mt-4">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Receipt"
                            className="max-w-full max-h-96 rounded-md border border-gray-300"
                        />
                    ) : (
                        <p className="text-center">No image available</p>
                    )}
                </div>
                <DialogFooter className="flex justify-center mt-6">
                    <Button onClick={onClose} className="">Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReceiptImageModal;
