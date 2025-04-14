
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Smartphone } from 'lucide-react';

interface UpiPaymentFormProps {
  upiId: string;
  setUpiId: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

const UpiPaymentForm = ({ upiId, setUpiId, onSubmit, isProcessing }: UpiPaymentFormProps) => {
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <Smartphone className="h-5 w-5" />
        <h3 className="font-medium">UPI Payment</h3>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="upiId">UPI ID</Label>
          <Input 
            id="upiId" 
            placeholder="username@upi" 
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required 
          />
          <p className="text-sm text-muted-foreground mt-1">
            Enter your UPI ID (e.g., name@ybl, phone@upi)
          </p>
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay ₹2,499 with UPI"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpiPaymentForm;
