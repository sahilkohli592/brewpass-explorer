
import React, { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
  animation?: 'fade-in' | 'slide-up' | 'scale' | 'none';
  delay?: number;
  style?: CSSProperties;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  className,
  children,
  hover = true,
  animation = 'none',
  delay = 0,
  style
}) => {
  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in': return 'animate-fade-in';
      case 'slide-up': return 'animate-slide-up';
      case 'scale': return 'animate-scale';
      default: return '';
    }
  };
  
  return (
    <div
      className={cn(
        "glass rounded-2xl shadow-glass overflow-hidden",
        hover && "card-hover",
        getAnimationClass(),
        className
      )}
      style={{ 
        animationDelay: delay ? `${delay}ms` : '0ms',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
