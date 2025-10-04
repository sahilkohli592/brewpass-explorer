import React from 'react';
import { Coffee, Cake, Sandwich, IceCream } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import EnhancedButton from '@/components/ui/EnhancedButton';

const menuItems = [
  {
    id: 1,
    name: "Signature Latte",
    description: "Rich espresso with velvety steamed milk",
    price: "₹180",
    icon: Coffee,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Chocolate Brownie",
    description: "Warm, fudgy brownie with vanilla ice cream",
    price: "₹150",
    icon: Cake,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Club Sandwich",
    description: "Triple-decker with chicken, bacon & veggies",
    price: "₹220",
    icon: Sandwich,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Affogato",
    description: "Espresso shot over vanilla ice cream",
    price: "₹160",
    icon: IceCream,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
  },
];

const PopularMenuSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Menu Items</h2>
          <p className="text-foreground/70 text-lg">Favorite picks from our partnered cafés</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <GlassmorphicCard
              key={item.id}
              className="overflow-hidden group cursor-pointer"
              animation="fade-in"
              delay={index * 100}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between text-white">
                    <item.icon className="w-6 h-6" />
                    <span className="text-xl font-bold">{item.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-foreground/70 mb-4">{item.description}</p>
                <EnhancedButton variant="outline" size="sm" className="w-full">
                  Order Now
                </EnhancedButton>
              </div>
            </GlassmorphicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMenuSection;
