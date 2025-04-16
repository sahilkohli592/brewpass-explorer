
import React from 'react';
import { UsersRound, Coffee, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const VisitStats = () => {
  // Mock data - in a real app, this would come from an API
  const stats = {
    totalVisits: 142,
    totalRedemptions: 98,
    percentageChange: 12.5,
  };

  // Mock data for recent redemptions
  const recentRedemptions = [
    { id: 'BP123456', timestamp: '2023-04-16 09:45 AM', item: 'Flat White' },
    { id: 'BP789012', timestamp: '2023-04-16 10:30 AM', item: 'Cappuccino' },
    { id: 'BP345678', timestamp: '2023-04-15 02:15 PM', item: 'Espresso' },
    { id: 'BP901234', timestamp: '2023-04-15 11:20 AM', item: 'Latte' },
    { id: 'BP567890', timestamp: '2023-04-14 03:45 PM', item: 'Mocha' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Visits
            </CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisits}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.percentageChange}% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Redemptions
            </CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRedemptions}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.totalRedemptions / stats.totalVisits) * 100).toFixed(1)}% redemption rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.percentageChange}%</div>
            <p className="text-xs text-muted-foreground">
              Compared to previous month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Redemptions</CardTitle>
          <CardDescription>
            List of recent customer redemptions at your café
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pass ID</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Item Redeemed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRedemptions.map((redemption) => (
                <TableRow key={redemption.id}>
                  <TableCell className="font-medium">{redemption.id}</TableCell>
                  <TableCell>{redemption.timestamp}</TableCell>
                  <TableCell>{redemption.item}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitStats;
