import React, { useState } from 'react';
import { Users, Copy, Share } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ReferralProgram = () => {
  const { toast } = useToast();
  const [referralCode] = useState("BREWYUM2023");

  // Updated rewards data - ₹50 cashback for each referral
  const rewards = [
    { friends: 1, reward: "₹50 Cashback" },
    { friends: 2, reward: "₹100 Cashback" },
    { friends: 3, reward: "₹150 Cashback + 1 Free Drink" },
    { friends: 5, reward: "₹250 Cashback + 25% Off on Annual Pass" },
    { friends: 10, reward: "₹500 Cashback + 1 Month Free Subscription" }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied to clipboard!",
      description: "Share this code with your friends",
    });
  };

  const shareReferral = () => {
    // In a real app, implement proper sharing functionality
    if (navigator.share) {
      navigator.share({
        title: 'Join me on BrewPass',
        text: `Use my referral code ${referralCode} to get ₹100 off on your first BrewPass!`,
        url: 'https://brewpass.com/refer',
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      copyToClipboard();
    }
  };

  return (
    <BlurredBackground className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Users size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Refer Friends & Earn Rewards</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Invite your friends to join BrewPass and earn ₹50 cashback for each successful referral.
          </p>
        </div>

        {/* Referral Code Card */}
        <GlassmorphicCard className="mb-12 overflow-hidden animate-slide-up">
          <div className="p-8">
            <h2 className="text-xl font-bold mb-4 text-center">Your Unique Referral Code</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-muted/50 rounded-lg px-6 py-4 font-mono text-xl tracking-wider">
                {referralCode}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2 hover:bg-primary/10 hover:text-primary"
                onClick={copyToClipboard}
              >
                <Copy size={18} />
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="group" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Copy Code
              </Button>
              <Button 
                variant="outline" 
                className="group" 
                onClick={shareReferral}
              >
                <Share className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Share with Friends
              </Button>
            </div>
          </div>
        </GlassmorphicCard>

        {/* How It Works */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassmorphicCard className="p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                1
              </div>
              <h3 className="font-bold mb-2">Share Your Code</h3>
              <p className="text-sm text-foreground/70">
                Share your unique referral code with friends via social media, email, or text.
              </p>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                2
              </div>
              <h3 className="font-bold mb-2">Friends Sign Up</h3>
              <p className="text-sm text-foreground/70">
                Your friends create an account and apply your code during checkout.
              </p>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="p-6 text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                3
              </div>
              <h3 className="font-bold mb-2">Both Get Rewards</h3>
              <p className="text-sm text-foreground/70">
                You earn rewards for each successful referral, and they get a special discount.
              </p>
            </GlassmorphicCard>
          </div>
        </div>

        {/* Rewards Table */}
        <GlassmorphicCard 
          className="overflow-hidden animate-slide-up" 
          delay={400}
        >
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6 text-center">Referral Rewards</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Number of Friends</th>
                    <th className="text-left py-3 px-4 font-medium">Your Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.map((item, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      <td className="py-3 px-4">{item.friends} Friend{item.friends > 1 ? 's' : ''}</td>
                      <td className="py-3 px-4 font-medium">{item.reward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-foreground/70">
                Get ₹50 cashback for each friend you refer! There's no limit to how many friends you can refer or rewards you can earn!
              </p>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    </BlurredBackground>
  );
};

export default ReferralProgram;
