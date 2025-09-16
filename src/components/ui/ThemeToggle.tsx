import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
        <div className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "relative w-10 h-10 p-0 rounded-full",
        "hover:bg-primary/10 transition-all duration-300",
        "border border-primary/20 backdrop-blur-sm"
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div className="relative w-4 h-4">
        <Sun 
          className={cn(
            "absolute inset-0 w-4 h-4 transition-all duration-300",
            "rotate-0 scale-100 text-primary",
            theme === 'dark' && "-rotate-90 scale-0"
          )} 
        />
        <Moon 
          className={cn(
            "absolute inset-0 w-4 h-4 transition-all duration-300",
            "rotate-90 scale-0 text-primary",
            theme === 'dark' && "rotate-0 scale-100"
          )} 
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;