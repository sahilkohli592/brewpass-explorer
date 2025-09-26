import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Coffee, QrCode, Share, Gift, Award, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';

const LoyaltySection = () => {
  const [showQR, setShowQR] = useState(false);
  
  const userCard = {
    id: "BP123456789",
    qrValue: "https://brewpass.com/redeem/BP123456789",
    drinksRedeemed: 7,
    totalDrinks: 30,
    points: 1250,
    tier: "Gold"
  };

  const progressPercentage = (userCard.drinksRedeemed / userCard.totalDrinks) * 100;

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">My Rewards</h2>
          <p className="text-foreground/70">Track your progress and redeem rewards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Digital Pass */}
          <GlassmorphicCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Coffee className="w-5 h-5 text-primary mr-2" />
                <span className="font-bold text-lg">BrewPass</span>
              </div>
              <Badge variant="secondary">{userCard.tier}</Badge>
            </div>

            {showQR ? (
              <div className="flex justify-center mb-6">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <QRCodeCanvas 
                    value={userCard.qrValue} 
                    size={150}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="h-16 w-16 text-white" />
                </div>
                <p className="text-sm text-foreground/70">Tap to show QR code</p>
              </div>
            )}

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Drinks Progress</span>
                <span className="font-medium">{userCard.drinksRedeemed} / {userCard.totalDrinks}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${progressPercentage}%` }} 
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => setShowQR(!showQR)}
              >
                <QrCode className="mr-2 h-4 w-4" />
                {showQR ? 'Hide QR' : 'Show QR'}
              </Button>
              <Button className="flex-1">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </GlassmorphicCard>

          {/* Wallet & Stats */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-primary mr-2" />
                    <span className="font-semibold">Wallet Balance</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">₹{userCard.points}</div>
                <p className="text-sm text-foreground/70">Available for redemption</p>
                <Button className="w-full mt-4" variant="outline">
                  Add Money
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-primary mr-2" />
                    <span className="font-semibold">Achievements</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userCard.drinksRedeemed}</div>
                    <p className="text-xs text-foreground/70">Drinks Redeemed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15</div>
                    <p className="text-xs text-foreground/70">Cafés Visited</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Gift className="w-5 h-5 text-primary mr-2" />
                    <span className="font-semibold">Available Offers</span>
                  </div>
                  <Badge variant="secondary">3 New</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">20% Off Next Order</span>
                    <p className="text-xs text-foreground/70">Valid until tomorrow</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Free Pastry</span>
                    <p className="text-xs text-foreground/70">With any coffee purchase</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" size="sm">
                  View All Offers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltySection;