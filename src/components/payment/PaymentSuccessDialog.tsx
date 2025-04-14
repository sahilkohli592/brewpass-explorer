
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';

interface PaymentSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  paymentMethod: 'card' | 'upi';
}

const PaymentSuccessDialog = ({ 
  open, 
  onOpenChange, 
  onClose, 
  paymentMethod 
}: PaymentSuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            Payment Successful!
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 text-center">
          <p className="mb-4">
            Thank you for purchasing BrewPass! Your digital passport is now ready.
          </p>
          <p className="text-sm text-gray-500">
            {paymentMethod === 'card' 
              ? 'Your credit card payment was successful.' 
              : 'Your UPI payment was successful.'}
          </p>
          <p className="text-sm text-gray-500">
            You can access your BrewPass in the Loyalty Card section.
          </p>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            View My BrewPass
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessDialog;
