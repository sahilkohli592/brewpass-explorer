
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowRight, MapPin, CreditCard, Utensils, Heart } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import BlurredBackground from '@/components/ui/BlurredBackground';
import InteractiveCard from '@/components/ui/InteractiveCard';
import EnhancedButton from '@/components/ui/EnhancedButton';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import PullToRefresh from '@/components/ui/PullToRefresh';
import cafeInterior from '@/assets/cafe-interior.jpg';
import cafeOutdoor from '@/assets/cafe-outdoor.jpg';
import menuFood from '@/assets/menu-food.jpg';
import menuDrinks from '@/assets/menu-drinks.jpg';
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
      <div className="min-h-screen gradient-primary">
        <BlurredBackground>
          <div className="absolute inset-0 gradient-primary opacity-50" />
        </BlurredBackground>
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 px-6 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8 md:space-y-12">
              <AnimatedLogo size="lg" className="mx-auto" />
              
              <div className="space-y-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold animate-slide-up bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Discover Amazing Café
                  <span className="block text-primary"> Experiences.</span>
                </h1>
                
                <p className="text-xl text-foreground/80 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '200ms' }}>
                  Your gateway to premium coffee culture. Join over{' '}
                  <AnimatedCounter 
                    end={50000} 
                    duration={3000} 
                    className="text-primary font-bold"
                    separator=","
                  />{' '}
                  coffee lovers exploring handpicked cafés and exclusive deals.
                </p>
              </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <Link to="/cafes">
                <EnhancedButton 
                  variant="gradient" 
                  size="lg" 
                  className="text-lg px-8 py-4"
                  icon={Coffee}
                  iconPosition="left"
                  glow
                >
                  Explore Cafés
                </EnhancedButton>
              </Link>
              
              <Link to="/dineout">
                <EnhancedButton 
                  variant="glow" 
                  size="lg" 
                  className="text-lg px-8 py-4"
                  icon={MapPin}
                  iconPosition="left"
                  haptic={true}
                >
                  DineOut Deals
                </EnhancedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Experience Coffee Culture
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Join thousands discovering premium cafés, exclusive deals, and unforgettable moments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <InteractiveCard 
                key={index}
                className="menu-card p-8 animate-on-scroll opacity-0 h-full" 
                tiltEffect={true}
                glowOnHover={true}
                hapticFeedback={true}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-full mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">{feature.title}</h3>
                  <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Cafe Photos Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-brew-800">
              Our Beautiful Cafés
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Step into cozy spaces designed for coffee lovers like you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassmorphicCard className="overflow-hidden animate-on-scroll opacity-0 group" hover>
              <div className="relative h-64 md:h-80">
                <img 
                  src={cafeInterior} 
                  alt="Cozy cafe interior with warm lighting and comfortable seating"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Cozy Interiors</h3>
                  <p className="text-white/90">Warm spaces perfect for studying or relaxing</p>
                </div>
              </div>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="overflow-hidden animate-on-scroll opacity-0 group" hover>
              <div className="relative h-64 md:h-80">
                <img 
                  src={cafeOutdoor} 
                  alt="Beautiful outdoor cafe terrace with plants and umbrellas"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Outdoor Terraces</h3>
                  <p className="text-white/90">Enjoy fresh air with your favorite coffee</p>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </section>

      {/* Menu Photos Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-brew-800">
              Delicious Menu
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              From artisan coffee to gourmet food, we have something for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassmorphicCard className="overflow-hidden animate-on-scroll opacity-0 group" hover>
              <div className="relative h-64 md:h-80">
                <img 
                  src={menuDrinks} 
                  alt="Premium coffee drinks with beautiful latte art"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Premium Drinks</h3>
                  <p className="text-white/90">Expertly crafted coffees and specialty beverages</p>
                </div>
              </div>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="overflow-hidden animate-on-scroll opacity-0 group" hover>
              <div className="relative h-64 md:h-80">
                <img 
                  src={menuFood} 
                  alt="Gourmet food including pastries, sandwiches and salads"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Gourmet Food</h3>
                  <p className="text-white/90">Fresh pastries, sandwiches, and healthy options</p>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </section>

      {/* Combo Deals Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-brew-800">
              Special Combo Deals
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Save more with our carefully curated combo packages.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassmorphicCard className="overflow-hidden animate-on-scroll opacity-0 group" hover>
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
                <h3 className="text-xl font-bold mb-2 text-brew-800">Coffee + Pastry</h3>
                <p className="text-foreground/80 mb-4">Any specialty coffee with fresh baked pastry</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brew-700">₹249</span>
                  <EnhancedButton 
                    size="sm" 
                    variant="gradient"
                    className="group"
                    icon={Heart}
                    iconPosition="left"
                    glow
                  >
                    Order Now
                  </EnhancedButton>
                </div>
              </div>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="overflow-hidden animate-on-scroll opacity-0 group" hover>
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
                <h3 className="text-xl font-bold mb-2 text-brew-800">Lunch Combo</h3>
                <p className="text-foreground/80 mb-4">Coffee + sandwich + side salad</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brew-700">₹399</span>
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
            
            <GlassmorphicCard className="overflow-hidden animate-on-scroll opacity-0 group" hover>
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
                <h3 className="text-xl font-bold mb-2 text-brew-800">Sweet Treat</h3>
                <p className="text-foreground/80 mb-4">Premium coffee with artisan cake slice</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brew-700">₹329</span>
                  <EnhancedButton 
                    size="sm" 
                    variant="glow"
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

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassmorphicCard className="menu-card overflow-hidden animate-on-scroll opacity-0">
            <div className="gradient-card p-8 md:p-16 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brew-600/10 via-brew-500/5 to-brew-600/10 rounded-2xl" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-brew-800">
                  Start Your Coffee Adventure
                </h2>
                <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8 leading-relaxed">
                  Discover handpicked cafés, exclusive deals, and create memorable moments 
                  with every visit. Your perfect coffee experience awaits.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/cafes">
                    <EnhancedButton 
                      size="lg" 
                      variant="gradient"
                      className="text-lg px-8 py-4"
                      icon={Coffee}
                      iconPosition="left"
                      glow
                    >
                      Explore Now
                    </EnhancedButton>
                  </Link>
                  <Link to="/loyalty-card">
                    <EnhancedButton 
                      size="lg" 
                      variant="glow"
                      className="text-lg px-8 py-4"
                      icon={CreditCard}
                      iconPosition="left"
                    >
                      Get Loyalty Card
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
