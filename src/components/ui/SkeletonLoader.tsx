import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  lines?: number;
  animation?: 'pulse' | 'wave' | 'none';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  variant = 'rectangular',
  lines = 1,
  animation = 'pulse'
}) => {
  const baseClasses = "bg-gradient-to-r from-muted via-muted/50 to-muted";
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse-soft',
    none: ''
  };

  const variantClasses = {
    text: 'h-4 rounded-md',
    circular: 'rounded-full aspect-square',
    rectangular: 'h-20 rounded-lg',
    card: 'h-48 rounded-2xl'
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses.text,
              animationClasses[animation],
              index === lines - 1 ? 'w-3/4' : 'w-full'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
    />
  );
};

export default SkeletonLoader;