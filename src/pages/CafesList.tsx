
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Coffee, ArrowRight } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Dummy data - would come from an API in a real app
const cafesData = [
  {
    id: 1,
    name: "Blue Tokai Coffee",
    address: "Khan Market, New Delhi",
    specialty: "Single Origin Pour Overs",
    image: "https://source.unsplash.com/random/300x200/?coffee,cafe"
  },
  {
    id: 2,
    name: "Third Wave Coffee",
    address: "Indiranagar, Bangalore",
    specialty: "Specialty Coffee & Pastries",
    image: "https://source.unsplash.com/random/300x200/?coffee,shop"
  },
  {
    id: 3,
    name: "Starbucks",
    address: "Connaught Place, New Delhi",
    specialty: "Frappuccinos & Cold Brews",
    image: "https://source.unsplash.com/random/300x200/?starbucks"
  },
  {
    id: 4,
    name: "Roastery Coffee House",
    address: "Banjara Hills, Hyderabad",
    specialty: "House-roasted Specialty Coffee",
    image: "https://source.unsplash.com/random/300x200/?roastery"
  },
  {
    id: 5,
    name: "Café Coffee Day",
    address: "MG Road, Bangalore",
    specialty: "Signature Cold Coffee",
    image: "https://source.unsplash.com/random/300x200/?cafe,india"
  },
  {
    id: 6,
    name: "Araku Coffee",
    address: "Indiranagar, Bangalore",
    specialty: "Specialty Indian Coffee",
    image: "https://source.unsplash.com/random/300x200/?coffee,beans"
  }
];

const CafesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCafes, setFilteredCafes] = useState(cafesData);

  useEffect(() => {
    // Filter cafes based on search term
    const results = cafesData.filter(cafe =>
      cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cafe.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cafe.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCafes(results);
  }, [searchTerm]);

  return (
    <BlurredBackground className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Partner Cafés</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover our handpicked selection of the finest cafés in your city.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-12 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by café name, location, or specialty..."
              className="pl-10 py-6 rounded-full shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Cafés Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCafes.length > 0 ? (
            filteredCafes.map((cafe, index) => (
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
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{cafe.name}</h3>
                  <div className="flex items-center text-sm text-foreground/70 mb-2">
                    <MapPin className="w-4 h-4 mr-1" /> 
                    <span>{cafe.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-foreground/70 mb-4">
                    <Coffee className="w-4 h-4 mr-1" /> 
                    <span>{cafe.specialty}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full group"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </GlassmorphicCard>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-foreground/70">
                No cafés match your search. Try different keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </BlurredBackground>
  );
};

export default CafesList;
