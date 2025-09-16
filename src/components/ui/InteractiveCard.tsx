import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useHaptics } from '@/hooks/useHaptics';
import { useSwipeGestures } from '@/hooks/useSwipeGestures';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  hoverable?: boolean;
  clickable?: boolean;
  tiltEffect?: boolean;
  glowOnHover?: boolean;
  hapticFeedback?: boolean;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className,
  onClick,
  onSwipeLeft,
  onSwipeRight,
  hoverable = true,
  clickable = true,
  tiltEffect = false,
  glowOnHover = false,
  hapticFeedback = true
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { impact } = useHaptics();

  const swipeHandlers = useSwipeGestures({
    onSwipeLeft,
    onSwipeRight
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / centerY * -10;
    const tiltY = (x - centerX) / centerX * 10;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = async () => {
    if (!clickable) return;
    
    if (hapticFeedback) {
      await impact();
    }
    onClick?.();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPressed(true);
    swipeHandlers.onTouchStart(e);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPressed(false);
    swipeHandlers.onTouchEnd(e);
  };

  return (
    <div
      className={cn(
        "glass rounded-2xl overflow-hidden transition-all duration-300 ease-out",
        "transform-gpu perspective-1000",
        hoverable && "hover:translate-y-[-4px] hover:shadow-2xl",
        glowOnHover && "hover:shadow-glow",
        clickable && "cursor-pointer active:scale-95",
        isPressed && "scale-95",
        className
      )}
      style={{
        transform: tiltEffect 
          ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
          : undefined,
        willChange: 'transform'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={swipeHandlers.onTouchMove}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;