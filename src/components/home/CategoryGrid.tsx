import React from 'react';
import { Coffee, Pizza, Sandwich, IceCream, Cake, Salad, Croissant, Soup } from 'lucide-react';
import InteractiveCard from '@/components/ui/InteractiveCard';

const categories = [
  { name: 'Coffee', icon: Coffee, color: 'bg-primary/10 text-primary' },
  { name: 'Pizza', icon: Pizza, color: 'bg-red-50 text-red-600' },
  { name: 'Sandwich', icon: Sandwich, color: 'bg-green-50 text-green-600' },
  { name: 'Desserts', icon: IceCream, color: 'bg-purple-50 text-purple-600' },
  { name: 'Cakes', icon: Cake, color: 'bg-pink-50 text-pink-600' },
  { name: 'Salads', icon: Salad, color: 'bg-emerald-50 text-emerald-600' },
  { name: 'Pastries', icon: Croissant, color: 'bg-amber-50 text-amber-600' },
  { name: 'Soups', icon: Soup, color: 'bg-orange-50 text-orange-600' },
];

const CategoryGrid = () => {
  return (
    <section className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-foreground">What's on your mind?</h2>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <InteractiveCard
              key={category.name}
              className="p-4 cursor-pointer group"
              tiltEffect={true}
              hapticFeedback={true}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`${category.color} p-3 rounded-xl group-hover:scale-105 transition-transform duration-200`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;