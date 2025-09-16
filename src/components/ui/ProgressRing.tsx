import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  strokeWidth?: number;
  className?: string;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'destructive';
  showPercentage?: boolean;
  animated?: boolean;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 'md',
  strokeWidth,
  className,
  color = 'primary',
  showPercentage = true,
  animated = true
}) => {
  const sizes = {
    sm: { diameter: 40, defaultStroke: 4, text: 'text-xs' },
    md: { diameter: 60, defaultStroke: 6, text: 'text-sm' },
    lg: { diameter: 80, defaultStroke: 8, text: 'text-base' },
    xl: { diameter: 120, defaultStroke: 10, text: 'text-lg' }
  };

  const sizeConfig = sizes[size];
  const stroke = strokeWidth || sizeConfig.defaultStroke;
  const radius = (sizeConfig.diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const colors = {
    primary: 'stroke-primary',
    accent: 'stroke-accent',
    success: 'stroke-success',
    warning: 'stroke-warning',
    destructive: 'stroke-destructive'
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={sizeConfig.diameter}
        height={sizeConfig.diameter}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={sizeConfig.diameter / 2}
          cy={sizeConfig.diameter / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          className="text-muted/30"
        />
        
        {/* Progress circle */}
        <circle
          cx={sizeConfig.diameter / 2}
          cy={sizeConfig.diameter / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            colors[color],
            animated && "transition-all duration-1000 ease-out"
          )}
        />
      </svg>
      
      {showPercentage && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          sizeConfig.text,
          "font-semibold text-foreground"
        )}>
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default ProgressRing;