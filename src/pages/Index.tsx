
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Utensils, Heart, Bell, MapPin, ArrowRight } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import BlurredBackground from '@/components/ui/BlurredBackground';
import InteractiveCard from '@/components/ui/InteractiveCard';
import EnhancedButton from '@/components/ui/EnhancedButton';
import PullToRefresh from '@/components/ui/PullToRefresh';
import HeroBanner from '@/components/home/HeroBanner';
import NearbyCafes from '@/components/home/NearbyCafes';
import LoyaltySection from '@/components/home/LoyaltySection';
import { Badge } from '@/components/ui/badge';
import comboDeals from '@/assets/combo-deals.jpg';

const features = [
  {
    title: "30 Free Drinks",
    description: "One free premium beverage at each of our 30 partner cafés.",
    icon: <Coffee className="w-6 h-6" />,
  },
  {
    title: "Premium Locations",
    description: "We've partnered with the best coffee shops in town.",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    title: "Digital Pass",
    description: "Use your phone to redeem drinks. No physical cards needed.",
    icon: <ArrowRight className="w-6 h-6" />,
  }
];

const Index = () => {
  useEffect(() => {
    // Animate elements when they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-background">
        <BlurredBackground>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        </BlurredBackground>
      
        {/* Hero Section */}
        <HeroBanner />
        
        {/* Notifications Bar */}
        <section className="py-4 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Latest Updates</span>
                <Badge variant="secondary" className="text-xs">3 New</Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-foreground/70">
                <span>🎉 Welcome bonus: 20% off first order</span>
                <span>☕ New café partner: Blue Tokai Coffee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Cafés */}
        <NearbyCafes />

        {/* Order Now Section */}
        <section className="py-16 px-6 bg-muted/20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Now</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Quick access to your favorite cafés and instant ordering
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/cafes">
                <EnhancedButton variant="gradient" size="lg" icon={Coffee} iconPosition="left">
                  Browse Cafés
                </EnhancedButton>
              </Link>
              <Link to="/dineout">
                <EnhancedButton variant="outline" size="lg" icon={Utensils} iconPosition="left">
                  DineOut Menu
                </EnhancedButton>
              </Link>
            </div>
          </div>
        </section>

        {/* My Rewards / Loyalty Section */}
        <LoyaltySection />

        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll opacity-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Why Choose BrewPass?
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Experience premium coffee culture with exclusive benefits and rewards.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <InteractiveCard 
                  key={index}
                  className="p-8 animate-on-scroll opacity-0 h-full" 
                  tiltEffect={true}
                  glowOnHover={true}
                  hapticFeedback={true}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-full mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Special Combo Deals
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Save more with our carefully curated combo packages.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassmorphicCard className="overflow-hidden group" hover>
                <div className="relative h-48">
                  <img 
                    src={comboDeals} 
                    alt="Coffee and pastry combo deal"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save 20%
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Coffee + Pastry</h3>
                  <p className="text-foreground/70 mb-4">Any specialty coffee with fresh baked pastry</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">₹249</span>
                    <EnhancedButton 
                      size="sm" 
                      variant="gradient"
                      icon={Heart}
                      iconPosition="left"
                    >
                      Order Now
                    </EnhancedButton>
                  </div>
                </div>
              </GlassmorphicCard>
              
              <GlassmorphicCard className="overflow-hidden group" hover>
                <div className="relative h-48">
                  <img 
                    src={comboDeals} 
                    alt="Coffee and sandwich combo deal"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save 25%
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Lunch Combo</h3>
                  <p className="text-foreground/70 mb-4">Coffee + sandwich + side salad</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">₹399</span>
                    <EnhancedButton 
                      size="sm" 
                      variant="gradient"
                      icon={Utensils}
                      iconPosition="left"
                    >
                      Order Now
                    </EnhancedButton>
                  </div>
                </div>
              </GlassmorphicCard>
              
              <GlassmorphicCard className="overflow-hidden group" hover>
                <div className="relative h-48">
                  <img 
                    src={comboDeals} 
                    alt="Premium coffee and cake combo deal"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save 30%
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Sweet Treat</h3>
                  <p className="text-foreground/70 mb-4">Premium coffee with artisan cake slice</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">₹329</span>
                    <EnhancedButton 
                      size="sm" 
                      variant="outline"
                      icon={Coffee}
                      iconPosition="left"
                    >
                      Order Now
                    </EnhancedButton>
                  </div>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </section>
      </div>
    </PullToRefresh>
  );
};

export default Index;
