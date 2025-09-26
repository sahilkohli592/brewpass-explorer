
import React from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import NearbyCafes from '@/components/home/NearbyCafes';
import OrderSection from '@/components/home/OrderSection';
import RewardsSection from '@/components/home/RewardsSection';
import MembershipWallet from '@/components/home/MembershipWallet';
import NotificationsSection from '@/components/home/NotificationsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner with Offers */}
      <HeroBanner />
      
      {/* Nearby Cafes / Active Cafes */}
      <NearbyCafes />
      
      {/* Order Now Section */}
      <OrderSection />
      
      {/* My Rewards Section */}
      <RewardsSection />
      
      {/* Membership & Wallet */}
      <MembershipWallet />
      
      {/* Notifications */}
      <NotificationsSection />
    </div>
  );
};

export default Index;
