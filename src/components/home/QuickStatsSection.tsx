import React from 'react';
import { Coffee, Users, Star, MapPin } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';

const stats = [
  {
    id: 1,
    icon: Coffee,
    value: 150,
    suffix: '+',
    label: 'Partner Cafés',
    color: 'text-primary',
  },
  {
    id: 2,
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Active Users',
    color: 'text-accent',
  },
  {
    id: 3,
    icon: Star,
    value: 25000,
    suffix: '+',
    label: 'Reviews & Ratings',
    color: 'text-yellow-500',
  },
  {
    id: 4,
    icon: MapPin,
    value: 15,
    suffix: '+',
    label: 'Cities',
    color: 'text-green-500',
  },
];

const QuickStatsSection = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <GlassmorphicCard
              key={stat.id}
              className="p-6 text-center"
              animation="scale"
              delay={index * 100}
            >
              <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter
                  end={stat.value}
                  duration={2500}
                  separator=","
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-sm text-foreground/70">{stat.label}</p>
            </GlassmorphicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickStatsSection;
