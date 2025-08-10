import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  variant?: 'default' | 'search' | 'glass';
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(
  ({ className, icon, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "input-field",
      search: "menu-card pl-12 py-4 text-lg",
      glass: "glass border-primary/20 pl-12 py-4 text-lg bg-white/10 backdrop-blur-lg"
    };

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-full transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
            variants[variant],
            icon && "pl-12",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

ModernInput.displayName = "ModernInput";

export { ModernInput };