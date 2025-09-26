import React from 'react';
import { cn } from '@/lib/utils';

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'destructive' | 'success' | 'warning';
  showZero?: boolean;
  pulse?: boolean;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  maxCount = 99,
  className,
  size = 'md',
  variant = 'destructive',
  showZero = false,
  pulse = true
}) => {
  if (count === 0 && !showZero) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  const sizeClasses = {
    sm: 'h-4 w-4 text-xs min-w-[1rem]',
    md: 'h-5 w-5 text-xs min-w-[1.25rem]',
    lg: 'h-6 w-6 text-sm min-w-[1.5rem]'
  };

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground'
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-full font-bold",
        "transition-all duration-200",
        pulse && count > 0 && "animate-pulse-soft",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;