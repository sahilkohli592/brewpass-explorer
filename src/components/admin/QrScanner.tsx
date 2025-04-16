
import React, { useState } from 'react';
import { QrCode, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const QrScanner = () => {
  const [manualId, setManualId] = useState('');
  
  // In a real implementation, this would use the device camera to scan QR codes
  const handleScanClick = () => {
    toast({
      title: "Camera Access Required",
      description: "Please allow camera access to scan customer QR codes.",
    });
  };
  
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid pass ID",
        variant: "destructive",
      });
      return;
    }
    
    // Mock success - would validate with backend in real implementation
    toast({
      title: "Pass Validated",
      description: `Pass ID: ${manualId} is valid. Drink redeemed successfully.`,
    });
    setManualId('');
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <QrCode className="mr-2 h-5 w-5 text-primary" />
        Scan Customer Pass
      </h3>
      
      <div className="flex flex-col gap-4">
        <Button 
          onClick={handleScanClick} 
          className="gap-2 w-full"
        >
          <Scan className="h-4 w-4" />
          Open Camera Scanner
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or enter pass ID manually
            </span>
          </div>
        </div>
        
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <Input
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            placeholder="BP123456789"
            className="flex-1"
          />
          <Button type="submit">Verify</Button>
        </form>
      </div>
    </div>
  );
};

export default QrScanner;
