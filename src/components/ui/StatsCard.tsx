import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import InteractiveCard from './InteractiveCard';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  suffix?: string;
  prefix?: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  gradient?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  suffix = '',
  prefix = '',
  description,
  trend = 'neutral',
  trendValue,
  className,
  gradient = false
}) => {
  const trendColors = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground'
  };

  return (
    <InteractiveCard 
      className={cn(
        "p-6 h-full",
        gradient && "bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5",
        className
      )}
      clickable={false}
      tiltEffect={true}
      glowOnHover={true}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <AnimatedCounter
              end={value}
              prefix={prefix}
              suffix={suffix}
              duration={2000}
              className="text-3xl font-bold text-foreground"
            />
            {trendValue && (
              <span className={cn("text-sm font-medium", trendColors[trend])}>
                {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{trendValue}
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">
              {description}
            </p>
          )}
        </div>
        
        <div className={cn(
          "p-3 rounded-full transition-all duration-300",
          gradient 
            ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow"
            : "bg-primary/10 text-primary"
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </InteractiveCard>
  );
};

export default StatsCard;