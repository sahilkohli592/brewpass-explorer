
import React from 'react';
import { Coffee } from 'lucide-react';

interface OrderSummaryProps {
  paymentMethod: 'card' | 'upi';
}

const OrderSummary = ({ paymentMethod }: OrderSummaryProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Coffee className="mr-2 h-5 w-5" />
        Order Summary
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>BrewPass (30 Drinks)</span>
          <span>{paymentMethod === 'card' ? '$29.99' : '₹2,499'}</span>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>{paymentMethod === 'card' ? '$29.99' : '₹2,499'}</span>
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
    </>
  );
};

export default OrderSummary;
