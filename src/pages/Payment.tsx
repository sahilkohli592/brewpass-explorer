
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { CreditCard, Coffee, CheckCircle } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessDialog(true);
    }, 2000);
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    toast({
      title: "Payment Complete",
      description: "Thank you for purchasing BrewPass!",
    });
    navigate("/loyalty-card");
  };

  return (
    <BlurredBackground>
      <div className="container max-w-4xl mx-auto pt-20 pb-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Get Your BrewPass
        </h1>
        
        <div className="grid md:grid-cols-5 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-3">
            <GlassmorphicCard className="p-6" animation="fade-in">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Details
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
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
            </GlassmorphicCard>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-2">
            <GlassmorphicCard className="p-6" animation="fade-in" delay={200}>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Coffee className="mr-2 h-5 w-5" />
                Order Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>BrewPass (30 Drinks)</span>
                  <span>$29.99</span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$29.99</span>
                </div>
                
                <div className="pt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-2">Your BrewPass includes:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>One free premium beverage at each of our 30 partner cafés</li>
                    <li>Digital passport with QR code redemption</li>
                    <li>Access to exclusive coffee events</li>
                  </ul>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
        
        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
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
                You can access your BrewPass in the Loyalty Card section.
              </p>
            </div>
            
            <DialogFooter>
              <Button onClick={handleSuccessClose} className="w-full">
                View My BrewPass
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </BlurredBackground>
  );
};

export default Payment;
