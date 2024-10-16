import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

const DeniedOrderModal = ({ isOpen, onClose, onApprove }) => {
    const [itemName, setItemName] = useState('Office chair');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const router = useRouter();

    const handleAddRequest = () => {
        console.log({ itemName, quantity, price, description });
        onClose();
    };

    const handleApprove = () => {
        // onApprove({
        //     ...product,
        //     status: 'Approved', 
        // });
        onClose();
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-[#F8F8F8] items-center border-none rounded-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Denied Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex items-center justify-between mt-6 space-x-4">
                        <div className='space-y-4'>
                            <h3 className="text-sm">Name:{itemName}</h3>
                            <p className="text-sm">ID: 4123637</p>
                            <p className="text-sm">Brand: Elabest</p>
                            <p className="text-sm">Size: 44.8 x 27</p>
                            <p className="text-sm">Location: Operation Office</p>
                            <p className="text-sm">Category: Furniture</p>
                            <p>Denial reason: Loren ipsum</p>
                            <Input
                                id="text"
                                name="text"
                                type="text"
                                placeholder="Comment"
                            />
                        </div>
                        <Image
                            src="/officeChair.png"
                            alt="Office Chair"
                            width={95}
                            height={64}
                        />
                    </div>
                </div>
                <DialogFooter className="flex justify-center mt-6">
                    <Button className="text-white w-40" onClick={handleApprove}>
                        Approve
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeniedOrderModal;
