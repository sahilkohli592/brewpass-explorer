import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Trophy, Ticket, ArrowRight } from 'lucide-react';

const RewardsSection = () => {
  // Mock user rewards data
  const rewardsData = {
    totalPoints: 1250,
    pointsToNextReward: 250,
    totalRedemptions: 8,
    level: "Gold Member"
  };

  const availableVouchers = [
    {
      title: "Free Coffee",
      description: "Any regular coffee drink",
      points: 500,
      expires: "30 days",
      type: "coffee"
    },
    {
      title: "20% OFF",
      description: "Next order discount",
      points: 300,
      expires: "15 days",
      type: "discount"
    },
    {
      title: "Free Pastry",
      description: "Any pastry with coffee",
      points: 400,
      expires: "20 days",
      type: "food"
    }
  ];

  const recentActivity = [
    { action: "Earned 50 points", cafe: "Brew & Beans", date: "Today" },
    { action: "Redeemed free coffee", cafe: "Coffee Central", date: "2 days ago" },
    { action: "Earned 75 points", cafe: "Urban Grind", date: "1 week ago" }
  ];

  const progressPercent = ((rewardsData.totalPoints % 1500) / 1500) * 100;

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Rewards</h2>
            <p className="text-muted-foreground">Your earned points and vouchers</p>
          </div>
          <Link to="/loyalty-card">
            <Button variant="ghost" className="gap-2">
              View Details
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Points Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Rewards Overview
                </CardTitle>
                <Badge variant="secondary" className="gap-1">
                  <Trophy className="w-3 h-3" />
                  {rewardsData.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {rewardsData.totalPoints}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center p-4 bg-accent/5 rounded-xl">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {rewardsData.totalRedemptions}
                  </div>
                  <div className="text-sm text-muted-foreground">Redemptions</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to next reward</span>
                  <span>{rewardsData.pointsToNextReward} points to go</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>

              <Link to="/loyalty-card">
                <Button className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  Redeem Points
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex flex-col gap-1 pb-3 border-b border-border/50 last:border-0">
                    <div className="text-sm font-medium">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">
                      {activity.cafe} • {activity.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Vouchers */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-primary" />
                Available Vouchers
              </CardTitle>
              <Badge variant="outline">{availableVouchers.length} available</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableVouchers.map((voucher, index) => (
                <div key={index} className="p-4 border border-border rounded-xl hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{voucher.title}</h4>
                      <p className="text-sm text-muted-foreground">{voucher.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {voucher.points} pts
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Expires in {voucher.expires}
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Redeem Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RewardsSection;