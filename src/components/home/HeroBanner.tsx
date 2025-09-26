import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin } from 'lucide-react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import EnhancedButton from '@/components/ui/EnhancedButton';

const HeroBanner = () => {
  return (
    <section className="relative pt-32 pb-16 px-6 md:pt-40 md:pb-24">
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
  );
};

export default HeroBanner;