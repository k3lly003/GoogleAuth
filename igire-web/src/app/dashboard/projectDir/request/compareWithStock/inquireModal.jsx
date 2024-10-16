import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

const InquireModal = ({ isOpen, onClose, onInquire }) => {

    const handleInquire = () => {
        // onInquire();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-[#F8F8F8] items-center border-none rounded-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Inquire clarification</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2 mt-4">
                    <p className="text-sm">ID: 4123637</p>
                    <p className="text-sm">Brand: Elabest</p>
                    <p className="text-sm">Size: 44.8 x 27</p>
                    <p className="text-sm">Location: Office 1</p>
                    <p className="text-sm mb-1">status: New</p>
                    <Input 
                      id="text"
                      name="text"
                      type="text"
                      placeholder="Comment"
                    />
                </div>
                <DialogFooter className="flex justify-star mt-6">
                    <Button onClick={handleInquire} className="bg-[#0FA958] text-white px-4 py-2">Comfirm</Button>
                    <Button onClick={onClose} className="bg-red-500 text-white px-4 py-2 mr-2">Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default InquireModal;
