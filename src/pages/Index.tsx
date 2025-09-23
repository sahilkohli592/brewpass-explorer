
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowRight, MapPin, CreditCard, Utensils, Heart, Zap, Gift } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import BlurredBackground from '@/components/ui/BlurredBackground';
import InteractiveCard from '@/components/ui/InteractiveCard';
import EnhancedButton from '@/components/ui/EnhancedButton';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import PullToRefresh from '@/components/ui/PullToRefresh';
import CategoryGrid from '@/components/home/CategoryGrid';
import OffersCarousel from '@/components/home/OffersCarousel';
import QuickActions from '@/components/home/QuickActions';
import PopularSection from '@/components/home/PopularSection';
import cafeInterior from '@/assets/cafe-interior.jpg';
import cafeOutdoor from '@/assets/cafe-outdoor.jpg';
import menuFood from '@/assets/menu-food.jpg';
import menuDrinks from '@/assets/menu-drinks.jpg';
import comboDeals from '@/assets/combo-deals.jpg';

const features = [
  {
    title: "Fast Delivery",
    description: "Get your favorite coffee delivered in 15-30 minutes.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Premium Quality",
    description: "Partnered with the best cafés and restaurants in your area.",
    icon: <Coffee className="w-6 h-6" />,
  },
  {
    title: "Great Offers",
    description: "Enjoy exclusive deals and discounts on every order.",
    icon: <Gift className="w-6 h-6" />,
  }
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
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
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-20 pb-8 px-6 gradient-primary">
          <BlurredBackground>
            <div className="absolute inset-0 gradient-primary opacity-50" />
          </BlurredBackground>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center space-y-6">
              <AnimatedLogo size="md" className="mx-auto" />
              
              <div className="space-y-4 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold animate-slide-up bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Craving Something Delicious?
                </h1>
                
                <p className="text-lg text-foreground/80 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                  Order from{' '}
                  <AnimatedCounter 
                    end={500} 
                    duration={2000} 
                    className="text-primary font-bold"
                    suffix="+"
                  />{' '}
                  restaurants • Lightning fast delivery • Best prices
                </p>
              </div>
            
              <div className="flex justify-center gap-4 pt-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <Link to="/cafes">
                  <EnhancedButton 
                    variant="gradient" 
                    size="lg" 
                    className="px-6 py-3"
                    icon={Coffee}
                    iconPosition="left"
                    glow
                  >
                    Order Food
                  </EnhancedButton>
                </Link>
                
                <Link to="/dineout">
                  <EnhancedButton 
                    variant="glow" 
                    size="lg" 
                    className="px-6 py-3"
                    icon={MapPin}
                    iconPosition="left"
                    haptic={true}
                  >
                    Book Table
                  </EnhancedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <QuickActions />

        {/* Offers Carousel */}
        <OffersCarousel />

        {/* Categories */}
        <CategoryGrid />

        {/* Popular Restaurants */}
        <PopularSection />

        {/* Features Section */}
        <section className="relative py-16 md:py-20 px-6 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll opacity-0">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
                Why choose Krown?
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Experience the best food delivery service with unmatched quality and speed.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <InteractiveCard 
                  key={index}
                  className="menu-card p-6 animate-on-scroll opacity-0 h-full" 
                  tiltEffect={true}
                  glowOnHover={true}
                  hapticFeedback={true}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-primary">{feature.title}</h3>
                    <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="relative py-16 md:py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll opacity-0">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
                Trending Near You
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Discover what's popular in your neighborhood.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassmorphicCard className="overflow-hidden animate-on-scroll opacity-0 group" hover>
                <div className="relative h-64">
                  <img 
                    src={menuFood} 
                    alt="Trending food items with special offers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      🔥 Trending
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Gourmet Burgers</h3>
                    <p className="text-white/90">Starting from ₹199 • 25+ restaurants</p>
                  </div>
                </div>
              </GlassmorphicCard>
              
              <GlassmorphicCard className="overflow-hidden animate-on-scroll opacity-0 group" hover>
                <div className="relative h-64">
                  <img 
                    src={menuDrinks} 
                    alt="Trending beverages and cold coffee"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ❄️ Refreshing
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Cold Brews</h3>
                    <p className="text-white/90">Starting from ₹149 • Beat the heat</p>
                  </div>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 md:py-20 px-6 gradient-primary">
          <div className="max-w-4xl mx-auto">
            <GlassmorphicCard className="menu-card overflow-hidden animate-on-scroll opacity-0">
              <div className="p-8 md:p-12 text-center relative">
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
                    Ready to Order?
                  </h2>
                  <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                    Join thousands of food lovers who trust Krown for their daily cravings. 
                    Download our app for exclusive deals!
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/cafes">
                      <EnhancedButton 
                        size="lg" 
                        variant="gradient"
                        className="px-8 py-4"
                        icon={Utensils}
                        iconPosition="left"
                        glow
                      >
                        Start Ordering
                      </EnhancedButton>
                    </Link>
                    <Link to="/loyalty-card">
                      <EnhancedButton 
                        size="lg" 
                        variant="glow"
                        className="px-8 py-4"
                        icon={CreditCard}
                        iconPosition="left"
                      >
                        Get Premium
                      </EnhancedButton>
                    </Link>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </section>
      </div>
    </PullToRefresh>
  );
};

export default Index;
