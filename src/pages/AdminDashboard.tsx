
import React, { useState } from 'react';
import {
  Coffee,
  Users,
  Percent,
  ShieldAlert,
  QrCode,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QrScanner from '@/components/admin/QrScanner';
import VisitStats from '@/components/admin/VisitStats';
import PromotionManager from '@/components/admin/PromotionManager';
import FraudReporting from '@/components/admin/FraudReporting';

type TabType = 'scanner' | 'stats' | 'promotions' | 'reports';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('scanner');
  const [cafeInfo, setCafeInfo] = useState({
    name: "Coffee Haven",
    address: "123 Bean Street, Coffee District",
    memberSince: "January 2023",
  });

  // In a real app, this would be fetched from an API
  const cafePerformance = {
    ranking: 3,
    totalRedemptions: 98,
  };

  return (
    <div className="container py-24">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Café Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your BrewPass participation and customer interactions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg mb-2">{cafeInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{cafeInfo.address}</p>
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <span className="text-sm">Ranking:</span>
                  <span className="font-medium">#{cafePerformance.ranking} in your city</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm">Total Redemptions:</span>
                  <span className="font-medium">{cafePerformance.totalRedemptions}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <TabButton 
                    icon={<QrCode />}
                    label="Scan QR Code"
                    isActive={activeTab === 'scanner'}
                    onClick={() => setActiveTab('scanner')}
                  />
                  <TabButton 
                    icon={<Users />}
                    label="Visit Statistics"
                    isActive={activeTab === 'stats'}
                    onClick={() => setActiveTab('stats')}
                  />
                  <TabButton 
                    icon={<Percent />}
                    label="Manage Promotions"
                    isActive={activeTab === 'promotions'}
                    onClick={() => setActiveTab('promotions')}
                  />
                  <TabButton 
                    icon={<ShieldAlert />}
                    label="Report Issues"
                    isActive={activeTab === 'reports'}
                    onClick={() => setActiveTab('reports')}
                  />
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="w-full">
            <TabsContent value="scanner" className="mt-0">
              <QrScanner />
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <VisitStats />
            </TabsContent>
            
            <TabsContent value="promotions" className="mt-0">
              <PromotionManager />
            </TabsContent>
            
            <TabsContent value="reports" className="mt-0">
              <FraudReporting />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Helper component for sidebar navigation
const TabButton = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
      isActive 
        ? 'bg-primary/10 text-primary border-r-2 border-primary' 
        : 'hover:bg-muted'
    }`}
    onClick={onClick}
  >
    <span className="w-5 h-5">{icon}</span>
    <span>{label}</span>
    <span className="ml-auto">
      {isActive ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </span>
  </button>
);

export default AdminDashboard;
