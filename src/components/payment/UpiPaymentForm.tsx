
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Smartphone, QrCode, Scan } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QRCode from 'qrcode.react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface UpiPaymentFormProps {
  upiId: string;
  setUpiId: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

const UpiPaymentForm = ({ upiId, setUpiId, onSubmit, isProcessing }: UpiPaymentFormProps) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'qr'>('manual');
  const [isQrInfoOpen, setIsQrInfoOpen] = useState(false);
  
  // UPI payment url for QR code (typically used format)
  const upiQrValue = `upi://pay?pa=example@ybl&pn=BrewPass&am=2499&cu=INR&tn=BrewPass30DrinksPackage`;
  
  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Smartphone className="h-5 w-5" />
        <h3 className="font-medium">UPI Payment</h3>
      </div>
      
      <Tabs 
        defaultValue="manual" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'manual' | 'qr')} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="manual">Enter UPI ID</TabsTrigger>
          <TabsTrigger value="qr">Scan QR Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
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
        </TabsContent>
        
        <TabsContent value="qr" className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg mb-4">
            <QRCode 
              value={upiQrValue} 
              size={180} 
              level="H" 
              includeMargin 
              className="mx-auto"
            />
          </div>
          
          <Collapsible 
            open={isQrInfoOpen} 
            onOpenChange={setIsQrInfoOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-sm">
                <Scan className="h-4 w-4" />
                How to use this QR code
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="text-sm text-muted-foreground mt-2 space-y-2">
              <p>1. Open your UPI app (PhonePe, Google Pay, Paytm, etc.)</p>
              <p>2. Tap on the 'Scan QR' option</p>
              <p>3. Scan this QR code</p>
              <p>4. Verify payment details and confirm</p>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="w-full pt-4">
            <Button 
              type="button" 
              className="w-full" 
              onClick={(e) => onSubmit(e as any)} 
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm Payment: ₹2,499"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default UpiPaymentForm;
