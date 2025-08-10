
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import krownLogo from '@/assets/krown-logo.png';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  className, 
  size = 'md', 
  showText = true 
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!logoRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(logoRef.current);
    
    return () => {
      if (logoRef.current) observer.unobserve(logoRef.current);
    };
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div 
      ref={logoRef} 
      className={cn(
        "flex items-center space-x-3 opacity-0",
        className
      )}
    >
      <div className="relative">
        <img 
          src={krownLogo}
          alt="Krown Logo"
          className={cn(
            "animate-float object-contain",
            sizeClasses[size]
          )} 
        />
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-soft" />
      </div>
      
      {showText && (
        <span className={cn(
          "font-bold tracking-tight animate-slide-up",
          textSizeClasses[size]
        )}>
          BrewPass
        </span>
      )}
    </div>
  );
};

export default AnimatedLogo;
