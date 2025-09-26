import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useHaptics } from '@/hooks/useHaptics';

interface EnhancedButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient' | 'glow';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  haptic?: boolean;
  pulse?: boolean;
  glow?: boolean;
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  haptic = true,
  pulse = false,
  glow = false,
  children,
  onClick,
  disabled,
  ...props
}) => {
  const { impact } = useHaptics();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (haptic) {
      await impact();
    }
    onClick?.(e);
  };

  const variantStyles = {
    gradient: cn(
      "btn-gradient relative overflow-hidden",
      "bg-gradient-to-r from-primary via-accent to-primary",
      "text-primary-foreground font-semibold",
      "hover:shadow-2xl hover:scale-105",
      "active:scale-95 transition-all duration-300"
    ),
    glow: cn(
      "relative overflow-hidden",
      "bg-gradient-to-r from-primary to-accent",
      "text-primary-foreground font-semibold",
      "shadow-lg hover:shadow-2xl",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-glow/20 before:to-accent-glow/20",
      "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      "hover:scale-105 active:scale-95 transition-all duration-300"
    )
  };

  const getVariantClass = () => {
    if (variant === 'gradient') return variantStyles.gradient;
    if (variant === 'glow') return variantStyles.glow;
    return '';
  };

  return (
    <Button
      className={cn(
        getVariantClass(),
        pulse && "animate-pulse-soft",
        glow && "shadow-glow",
        loading && "opacity-70 cursor-not-allowed",
        className
      )}
      variant={variant === 'gradient' || variant === 'glow' ? 'default' : variant}
      size={size}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      <div className="flex items-center space-x-2 relative z-10">
        {Icon && iconPosition === 'left' && (
          <Icon className={cn(
            "w-4 h-4",
            loading && "animate-spin"
          )} />
        )}
        
        {children && <span>{children}</span>}
        
        {Icon && iconPosition === 'right' && (
          <Icon className={cn(
            "w-4 h-4",
            loading && "animate-spin"
          )} />
        )}
        
        {loading && !Icon && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    </Button>
  );
};

export default EnhancedButton;