import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  onClick,
  className,
  size = 'md',
  variant = 'primary',
  position = 'bottom-right'
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 p-3',
    md: 'w-14 h-14 p-4',
    lg: 'w-16 h-16 p-5'
  };

  const variantClasses = {
    primary: 'bg-gradient-primary text-primary-foreground shadow-elegant',
    secondary: 'bg-gradient-secondary text-secondary-foreground shadow-soft',
    accent: 'bg-gradient-accent text-accent-foreground shadow-glow'
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed z-50 rounded-full",
        "transition-all duration-300 ease-out",
        "hover:scale-110 hover:shadow-2xl",
        "active:scale-95",
        "backdrop-blur-sm border border-white/20",
        sizeClasses[size],
        variantClasses[variant],
        positionClasses[position],
        className
      )}
    >
      <Icon className="w-full h-full" />
    </button>
  );
};

export default FloatingActionButton;