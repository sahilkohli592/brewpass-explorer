import React, { useState } from 'react';
import { MapPin, Star, Clock, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import cafeInterior from '@/assets/cafe-interior.jpg';
import cafeOutdoor from '@/assets/cafe-outdoor.jpg';
import menuFood from '@/assets/menu-food.jpg';

const cafesData = [
  {
    id: 1,
    name: "Blue Tokai Coffee",
    address: "Khan Market, New Delhi",
    specialty: "Single Origin Pour Overs",
    image: cafeInterior,
    rating: 4.8,
    hours: { open: "06:00", close: "22:00", isOpen: true },
    distance: "0.5 km",
  },
  {
    id: 2,
    name: "Third Wave Coffee",
    address: "Indiranagar, Bangalore",
    specialty: "Specialty Coffee & Pastries",
    image: cafeOutdoor,
    rating: 4.5,
    hours: { open: "07:00", close: "23:00", isOpen: true },
    distance: "1.2 km",
  },
  {
    id: 3,
    name: "Roastery Coffee House",
    address: "Banjara Hills, Hyderabad",
    specialty: "House-roasted Specialty Coffee",
    image: menuFood,
    rating: 4.7,
    hours: { open: "08:00", close: "20:00", isOpen: false },
    distance: "2.1 km",
  },
];

const NearbyCafes = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (cafeId: number) => {
    setFavorites(prev => 
      prev.includes(cafeId) 
        ? prev.filter(id => id !== cafeId)
        : [...prev, cafeId]
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Nearby Cafés</h2>
            <p className="text-foreground/70">Discover amazing coffee experiences near you</p>
          </div>
          <Button variant="outline" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cafesData.map((cafe, index) => (
            <GlassmorphicCard
              key={cafe.id}
              className="overflow-hidden h-full"
              animation="fade-in"
              delay={index * 100}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={cafe.image} 
                  alt={cafe.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(cafe.id);
                  }}
                >
                  <Heart 
                    className={`h-4 w-4 ${favorites.includes(cafe.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </Button>
                <div className="absolute bottom-2 left-2">
                  <Badge variant={cafe.hours.isOpen ? "default" : "secondary"} className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {cafe.hours.isOpen ? 'Open' : 'Closed'}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{cafe.name}</h3>
                <div className="flex items-center text-sm text-foreground/70 mb-2">
                  <MapPin className="w-4 h-4 mr-1" /> 
                  <span>{cafe.address}</span>
                </div>
                <p className="text-sm text-foreground/70 mb-3">{cafe.specialty}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {renderStars(cafe.rating)}
                    <span className="ml-2 text-sm">{cafe.rating}</span>
                  </div>
                  <span className="text-sm text-foreground/70">{cafe.distance}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </GlassmorphicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyCafes;