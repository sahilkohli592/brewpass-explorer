import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
  backgroundImage?: string;
  backgroundOverlay?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  speed = 0.5,
  offset = 0,
  backgroundImage,
  backgroundOverlay = 'bg-black/20'
}) => {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate if element is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const yPos = -(scrolled - elementTop) * speed;
          setScrollY(yPos);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
    >
      {backgroundImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translate3d(0, ${scrollY + offset}px, 0)`,
            willChange: 'transform'
          }}
        />
      )}
      
      {backgroundImage && (
        <div className={cn("absolute inset-0", backgroundOverlay)} />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;