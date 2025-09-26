import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, CreditCard, ArrowUp, Plus, Crown, Star } from 'lucide-react';

const MembershipWallet = () => {
  // Mock wallet and membership data
  const walletData = {
    balance: 750,
    lastTransaction: "+₹200",
    transactionDate: "Today",
    membership: "Gold",
    nextTier: "Platinum",
    progressPercent: 65
  };

  const membershipBenefits = [
    { benefit: "20% off all orders", active: true },
    { benefit: "Free delivery", active: true },
    { benefit: "Priority support", active: true },
    { benefit: "Birthday rewards", active: false, upgrade: true }
  ];

  const quickActions = [
    { title: "Add Money", icon: <Plus className="w-4 h-4" />, action: "add-money" },
    { title: "Pay Bill", icon: <CreditCard className="w-4 h-4" />, action: "pay-bill" },
    { title: "Transfer", icon: <ArrowUp className="w-4 h-4" />, action: "transfer" }
  ];

  return (
    <div className="py-12 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Membership & Wallet</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage your wallet balance and upgrade your membership for exclusive benefits
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wallet Section */}
          <div className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Wallet Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    ₹{walletData.balance}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-green-600 font-medium">{walletData.lastTransaction}</span>
                    <span>•</span>
                    <span>{walletData.transactionDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {quickActions.map((action, index) => (
                    <Button key={index} variant="outline" size="sm" className="flex-col h-auto py-3">
                      {action.icon}
                      <span className="text-xs mt-1">{action.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <div>
                      <div className="font-medium">Order at Brew & Beans</div>
                      <div className="text-xs text-muted-foreground">Today, 2:30 PM</div>
                    </div>
                    <div className="text-red-600 font-medium">-₹180</div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <div>
                      <div className="font-medium">Wallet Top-up</div>
                      <div className="text-xs text-muted-foreground">Yesterday, 11:15 AM</div>
                    </div>
                    <div className="text-green-600 font-medium">+₹500</div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <div className="font-medium">Cashback Reward</div>
                      <div className="text-xs text-muted-foreground">2 days ago</div>
                    </div>
                    <div className="text-green-600 font-medium">+₹25</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Membership Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    Membership Status
                  </CardTitle>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {walletData.membership} Member
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to {walletData.nextTier}</span>
                    <span>{walletData.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                      style={{ width: `${walletData.progressPercent}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Spend ₹1,500 more to reach Platinum tier
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Your Benefits</h4>
                  <div className="space-y-3">
                    {membershipBenefits.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            item.active ? 'bg-green-500' : 'bg-muted-foreground'
                          }`} />
                          <span className={`text-sm ${
                            !item.active ? 'text-muted-foreground' : ''
                          }`}>
                            {item.benefit}
                          </span>
                        </div>
                        {item.upgrade && (
                          <Badge variant="outline" className="text-xs">
                            Upgrade
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/membership">
                  <Button className="w-full">
                    <Star className="w-4 h-4 mr-2" />
                    Upgrade Membership
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipWallet;