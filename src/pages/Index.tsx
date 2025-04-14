
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coffee, ArrowRight, MapPin } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import BlurredBackground from '@/components/ui/BlurredBackground';

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

  return (
    <BlurredBackground className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 px-6 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 md:space-y-12">
            <AnimatedLogo size="lg" className="mx-auto" />
            
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold animate-slide-up">
                30 Cafés. 30 Free Beverages.
                <span className="block text-primary"> One Pass.</span>
              </h1>
              
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
                Your premium passport to the best coffee experiences in town. 
                Discover new cafés and enjoy complimentary drinks along the way.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <Link to="/payment">
                <Button size="lg" className="btn-primary">
                  Get Your Pass Now
                </Button>
              </Link>
              
              <Link to="/cafes">
                <Button variant="outline" size="lg" className="group">
                  Explore Partner Cafés
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Coffee Lovers Choose BrewPass
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We've designed the perfect experience for coffee enthusiasts and casual drinkers alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassmorphicCard 
                key={index}
                className="p-8 animate-on-scroll opacity-0 h-full" 
                animation="fade-in"
                delay={index * 200}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-6 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              </GlassmorphicCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassmorphicCard className="overflow-hidden animate-on-scroll opacity-0">
            <div className="bg-primary/5 p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to start your coffee journey?
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
                Join thousands of coffee enthusiasts who have already discovered new favorite cafés with BrewPass.
              </p>
              <Link to="/payment">
                <Button size="lg" className="btn-primary">
                  Get Your BrewPass Today
                </Button>
              </Link>
            </div>
          </GlassmorphicCard>
        </div>
      </section>
    </BlurredBackground>
  );
};

export default Index;
