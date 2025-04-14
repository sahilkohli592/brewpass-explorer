
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';

interface CardPaymentFormProps {
  onSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

const CardPaymentForm = ({ onSubmit, isProcessing }: CardPaymentFormProps) => {
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <CreditCard className="h-5 w-5" />
        <h3 className="font-medium">Card Payment</h3>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Cardholder Name</Label>
          <Input id="name" placeholder="John Doe" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input 
            id="cardNumber" 
            placeholder="1234 5678 9012 3456" 
            maxLength={19}
            required 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" placeholder="MM/YY" maxLength={5} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="123" maxLength={3} required />
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay $29.99"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CardPaymentForm;
