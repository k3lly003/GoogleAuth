import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const UploadReceiptModal = ({ isOpen, onClose, onFileChange }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amountPerUnit, setAmountPerUnit] = useState('');
    const [transaction, setTransaction] = useState('');
    const [totalAmount, setTotalAmount] = useState('');

    const handleUploadReceipt = () => {
        // console.log({ name, quantity, amountPerUnit, role });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-[#F8F8F8] items-center border-none rounded-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Upload Receipt</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <div className="flex flex-col mb-4">
                            <Label htmlFor="transaction">Transaction</Label>
                            <Select id="transaction" onValueChange={setTransaction}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Transaction" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Transaction 1</SelectItem>
                                    <SelectItem value="user">Transaction 2</SelectItem>
                                    <SelectItem value="manager">Transaction 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Label htmlFor="name">Browse image</Label>
                        <Input
                            type="file"
                            onChange={onFileChange}
                            className="mb-4 mt-2"
                        />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                placeholder=""
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 w-3/4"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            placeholder=""
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="mt-2 w-3/4"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="amountPerUnit">Amount Per Unit</Label>
                        <Input
                            id="amountPerUnit"
                            placeholder=""
                            type="amountPerUnit"
                            value={amountPerUnit}
                            onChange={(e) => setAmountPerUnit(e.target.value)}
                            className="mt-2 w-3/4"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="totalAmount">Total Amount</Label>
                        <Input
                            id="totalAmount"
                            placeholder=""
                            type="totalAmount"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                            className="mt-2 w-3/4"
                        />
                    </div>

                </div>
                <DialogFooter className="flex justify-center mt-6">
                    <Button onClick={handleUploadReceipt} className="bg-[#0FA958] text-white px-8 py-2">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UploadReceiptModal;
