import React from 'react';
import { Coffee, Pizza, Sandwich, IceCream, Cake, Salad, Croissant, Soup } from 'lucide-react';
import InteractiveCard from '@/components/ui/InteractiveCard';

const categories = [
  { name: 'Coffee', icon: Coffee, color: 'from-amber-500 to-orange-600' },
  { name: 'Pizza', icon: Pizza, color: 'from-red-500 to-pink-600' },
  { name: 'Sandwich', icon: Sandwich, color: 'from-green-500 to-emerald-600' },
  { name: 'Desserts', icon: IceCream, color: 'from-purple-500 to-indigo-600' },
  { name: 'Cakes', icon: Cake, color: 'from-pink-500 to-rose-600' },
  { name: 'Salads', icon: Salad, color: 'from-lime-500 to-green-600' },
  { name: 'Pastries', icon: Croissant, color: 'from-yellow-500 to-amber-600' },
  { name: 'Soups', icon: Soup, color: 'from-orange-500 to-red-600' },
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
                <div className={`bg-gradient-to-br ${category.color} p-3 rounded-full text-white group-hover:scale-110 transition-transform duration-300`}>
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