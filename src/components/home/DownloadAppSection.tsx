import React from 'react';
import { Smartphone, Download, Zap } from 'lucide-react';
import EnhancedButton from '@/components/ui/EnhancedButton';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';

const DownloadAppSection = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <GlassmorphicCard className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Coming Soon</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">
                Download Our Mobile App
              </h2>
              
              <p className="text-lg text-foreground/70 leading-relaxed">
                Get the full Krown experience on your mobile device. Discover cafés, 
                earn rewards, and enjoy exclusive deals - all at your fingertips.
              </p>

              <ul className="space-y-3">
                {[
                  'Faster checkout with saved preferences',
                  'Real-time notifications for exclusive deals',
                  'Offline access to your loyalty cards',
                  'Easy table booking with one tap'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <EnhancedButton
                  variant="gradient"
                  size="lg"
                  icon={Download}
                  iconPosition="left"
                  glow
                >
                  App Store
                </EnhancedButton>
                <EnhancedButton
                  variant="glow"
                  size="lg"
                  icon={Download}
                  iconPosition="left"
                >
                  Google Play
                </EnhancedButton>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-64 h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl animate-pulse-soft" />
                <div className="relative bg-gradient-to-br from-muted to-background rounded-3xl border-8 border-foreground/10 shadow-2xl p-4 h-full flex items-center justify-center">
                  <Smartphone className="w-32 h-32 text-primary/40" />
                </div>
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    </section>
  );
};

export default DownloadAppSection;
