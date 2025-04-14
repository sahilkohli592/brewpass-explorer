
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { Separator } from '@/components/ui/separator';
import { CircleDashed } from 'lucide-react';
import CardPaymentForm from '@/components/payment/CardPaymentForm';
import UpiPaymentForm from '@/components/payment/UpiPaymentForm';
import OrderSummary from '@/components/payment/OrderSummary';
import PaymentSuccessDialog from '@/components/payment/PaymentSuccessDialog';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  
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
                Payment Details
              </h2>
              
              <div className="space-y-5 mb-6">
                <CardPaymentForm
                  onSubmit={handleSubmit}
                  isProcessing={isProcessing}
                />
                
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-4 text-sm text-muted-foreground flex items-center gap-2">
                      <CircleDashed className="h-4 w-4" />
                      OR
                      <CircleDashed className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                
                <UpiPaymentForm
                  upiId={upiId}
                  setUpiId={setUpiId}
                  onSubmit={(e) => {
                    setPaymentMethod('upi');
                    handleSubmit(e);
                  }}
                  isProcessing={isProcessing}
                />
              </div>
            </GlassmorphicCard>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-2">
            <GlassmorphicCard className="p-6" animation="fade-in" delay={200}>
              <OrderSummary paymentMethod={paymentMethod} />
            </GlassmorphicCard>
          </div>
        </div>
        
        {/* Success Dialog */}
        <PaymentSuccessDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
          onClose={handleSuccessClose}
          paymentMethod={paymentMethod}
        />
      </div>
    </BlurredBackground>
  );
};

export default Payment;
