import React from 'react';
import { Search, Filter, ScanLine, MapPin } from 'lucide-react';
import { ModernInput } from '@/components/ui/ModernInput';
import { Button } from '@/components/ui/button';

const QuickActions = () => {
  return (
    <section className="py-6 px-6 bg-white/95 backdrop-blur-sm sticky top-16 z-40 border-b border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <ModernInput
              placeholder="Search for restaurants, cuisines, dishes..."
              variant="glass"
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-border/30 hover:bg-primary/5"
            >
              <Filter className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="border-border/30 hover:bg-primary/5"
            >
              <ScanLine className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="border-border/30 hover:bg-primary/5"
            >
              <MapPin className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Location Bar */}
        <div className="flex items-center gap-2 mt-4 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">Delivering to:</span>
          <span className="text-primary font-medium">Koramangala, Bangalore</span>
          <button className="text-primary hover:underline ml-2">Change</button>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;