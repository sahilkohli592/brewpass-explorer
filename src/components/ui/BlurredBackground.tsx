
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BackgroundCircleProps {
  size: string;
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: string;
  blur?: string;
  animate?: boolean;
}

const BackgroundCircle: React.FC<BackgroundCircleProps> = ({
  size,
  color,
  top,
  left,
  right,
  bottom,
  opacity = '0.2',
  blur = '80px',
  animate = false,
}) => {
  return (
    <div
      className={cn(
        "absolute rounded-full",
        animate && "animate-float"
      )}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        backgroundColor: color,
        opacity,
        filter: `blur(${blur})`,
      }}
    />
  );
};

interface BlurredBackgroundProps {
  children: ReactNode;
  className?: string;
}

const BlurredBackground: React.FC<BlurredBackgroundProps> = ({ children, className }) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <BackgroundCircle
        size="400px"
        color="#8A624A"
        top="-100px"
        left="-100px"
        opacity="0.1"
        blur="100px"
        animate
      />
      <BackgroundCircle
        size="300px"
        color="#D2B48C"
        top="30%"
        right="-50px"
        opacity="0.1"
        blur="100px"
        animate
      />
      <BackgroundCircle
        size="200px"
        color="#FF9800"
        bottom="-50px"
        left="20%"
        opacity="0.08"
        blur="70px"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BlurredBackground;
