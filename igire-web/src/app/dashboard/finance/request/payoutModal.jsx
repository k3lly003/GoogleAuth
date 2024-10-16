import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

const PayoutModal = ({ isOpen, onClose, selectedProduct }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-[#F8F8F8] items-center border-none rounded-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Payout Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {selectedProduct ? (
                        <>
                            <p className="text-sm">Item: {selectedProduct.product}</p>
                            <p className="text-sm">Description: {selectedProduct.description || "No description available"}</p>
                            <p className="text-sm">Category: {selectedProduct.category || "N/A"}</p>
                            <p className="text-sm">Quantity: {selectedProduct.quantity} pcs</p>
                            <p className="text-sm mb-5">
                                Amount: {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "RWF"
                                }).format(selectedProduct.totalAmount)}
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-sm">Item: Mark board</p>
                            <p className="text-sm">Description: Loren ipsum</p>
                            <p className="text-sm">Cateory : Class equipment</p>
                            <p className="text-sm">Quantity: 3 pcs</p>
                            <p className="text-sm mb-1">Amount: 59, 000 rwf</p>
                            <Input
                                id="text"
                                name="text"
                                type="text"
                                placeholder="Comment"
                            />
                        </>
                    )}
                </div>
                <DialogFooter className="flex justify-start mt-6 space-x-2">
                    <Button onClick={onClose} className="bg-[#0FA958] hover:bg-green-900 text-white px-4 py-2">Confirm</Button>
                    <Button onClick={onClose} className="bg-red-500 hover:bg-red-800 text-white px-4 py-2">Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PayoutModal;
