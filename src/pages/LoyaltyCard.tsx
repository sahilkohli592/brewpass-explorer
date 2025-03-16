
import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Coffee, Share, QrCode } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const LoyaltyCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animation, setAnimation] = useState('');

  // Mock data - in a real app, this would come from an API
  const userCard = {
    id: "BP123456789",
    qrValue: "https://brewpass.com/redeem/BP123456789",
    name: "Coffee Enthusiast",
    drinksRedeemed: 7,
    totalDrinks: 30,
    expiryDate: "December 31, 2023"
  };

  useEffect(() => {
    // Simulate loading the card data
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimation('animate-scale');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    // In a real app, implement sharing functionality
    // For now, just show a simple alert
    alert("Sharing functionality would be implemented here!");
  };

  // Calculate progress percentage
  const progressPercentage = (userCard.drinksRedeemed / userCard.totalDrinks) * 100;

  return (
    <BlurredBackground className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Your Digital Pass</h1>
          <p className="text-foreground/70">
            Show this QR code at partner cafés to redeem your free beverage.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-80">
            <div className="animate-pulse flex space-x-2">
              <div className="h-3 w-3 bg-primary rounded-full"></div>
              <div className="h-3 w-3 bg-primary rounded-full"></div>
              <div className="h-3 w-3 bg-primary rounded-full"></div>
            </div>
          </div>
        ) : (
          <GlassmorphicCard className={`overflow-hidden ${animation}`}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Coffee className="w-5 h-5 text-primary mr-2" />
                  <span className="font-bold text-lg">BrewPass</span>
                </div>
                <span className="text-xs text-foreground/70">ID: {userCard.id}</span>
              </div>

              <div className="flex justify-center mb-6">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <QRCodeCanvas 
                    value={userCard.qrValue} 
                    size={200}
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                      src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvZmZlZSI+PHBhdGggZD0iTTE3IDhoMWE0IDQgMCAxIDEgMCA4aC0xIi8+PHBhdGggZD0iTTMgOGgxNHY5YTQgNCAwIDAgMS00IDRINyBhNCA0IDAgMCAxLTQtNFY4WiIvPjxsaW5lIHgxPSI2IiB5MT0iMiIgeDI9IjYiIHkyPSI0Ii8+PGxpbmUgeDE9IjEwIiB5MT0iMiIgeDI9IjEwIiB5Mj0iNCIvPjxsaW5lIHgxPSIxNCIgeTE9IjIiIHgyPSIxNCIgeTI9IjQiLz48L3N2Zz4=",
                      excavate: true,
                      width: 30,
                      height: 30,
                    }}
                  />
                </div>
              </div>
              
              <p className="text-center text-sm text-foreground/70 mb-6">
                Scan to redeem your free beverage
              </p>

              <Separator className="mb-6" />

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Drinks Redeemed</span>
                  <span className="font-medium">{userCard.drinksRedeemed} / {userCard.totalDrinks}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full animate-slide-right" 
                    style={{ width: `${progressPercentage}%`, transition: 'width 1s ease-in-out' }} 
                  />
                </div>
              </div>

              <p className="text-xs text-foreground/70 text-center mb-6">
                Valid until {userCard.expiryDate}
              </p>

              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1 group" onClick={handleShare}>
                  <Share className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Share Pass
                </Button>
                <Button className="flex-1 group">
                  <QrCode className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Redeem
                </Button>
              </div>
            </div>
          </GlassmorphicCard>
        )}

        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-sm text-foreground/70 mb-6">
            Having trouble with your pass? Contact our support team.
          </p>
          <Button variant="ghost" size="sm">
            View Help Center
          </Button>
        </div>
      </div>
    </BlurredBackground>
  );
};

export default LoyaltyCard;
