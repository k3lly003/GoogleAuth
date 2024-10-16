import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PayoutModal from './payoutModal';

const InitiatePaymentModal = ({
    isOpen,
    onClose,
    onRelease,
    selectedProduct
}) => {
    const [isPayoutModalOpen, setPayoutModalOpen] = React.useState(false);

    const handleRelease = () => {
        if (onRelease) onRelease();
        onClose();
    };

    const openPayoutModal = () => {
        onClose(); 
        setPayoutModalOpen(true); 
    };

    const closePayoutModal = () => {
        setPayoutModalOpen(false);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-lg bg-[#F8F8F8] items-center border-none rounded-xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold">Initial Payment</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2 mt-4">
                        {selectedProduct ? (
                            <>
                                <p className="text-sm">Item: {selectedProduct.product}</p>
                                <p className="text-sm">Description: {selectedProduct.description || "No description available"}</p>
                                <p className="text-sm">Category: {selectedProduct.category || "N/A"}</p>
                                <p className="text-sm">Quantity: {selectedProduct.quantity} pcs</p>
                                <p className="text-sm mb-1">
                                    Amount: {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "RWF"
                                    }).format(selectedProduct.totalAmount)}
                                </p>
                                <p className="text-sm mb-5">Requestor: {selectedProduct.requestor || "N/A"}</p>
                            </>
                        ) : (
                            <p className="text-sm">No product selected.</p>
                        )}
                    </div>
                    <DialogFooter className="flex justify-start mt-6 space-x-2">
                        <Button onClick={handleRelease} className="bg-[#0FA958] hover:bg-green-900 text-white px-4 py-2">Release</Button>
                        <Button onClick={openPayoutModal} className="bg-red-500 hover:bg-red-800 text-white px-4 py-2">Pay Out</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <PayoutModal
                isOpen={isPayoutModalOpen}
                onClose={closePayoutModal}
                selectedProduct={selectedProduct}
            />
        </>
    );
};

export default InitiatePaymentModal;
