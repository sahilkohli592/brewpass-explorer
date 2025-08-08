import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Star, Coffee, Wifi, Car, Music, CreditCard, Heart, Share2, Filter } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const cafes = [
  {
    id: 1,
    name: "Blue Tokai Coffee Roasters",
    image: "https://source.unsplash.com/random/400x250/?coffee,shop",
    speciality: "Specialty Coffee & Light Bites",
    rating: 4.8,
    reviewCount: 1205,
    location: "Khan Market, New Delhi",
    distance: "2.3 km",
    priceRange: "₹300-600",
    features: ["Fresh Roasted Coffee", "Laptop Friendly", "Outdoor Seating"],
    amenities: ["WiFi", "Parking", "AC", "Card Payment"],
    status: "Open",
    isLiked: false,
    images: [
      "https://source.unsplash.com/random/400x250/?coffee,shop",
      "https://source.unsplash.com/random/400x250/?espresso,latte",
      "https://source.unsplash.com/random/400x250/?cafe,interior"
    ],
    popularItems: ["Single Origin Espresso", "Cold Brew", "Croissant"],
    workingHours: "7:00 AM - 10:00 PM",
    atmosphere: "Perfect for work and meetings",
    instagramWorthy: true
  },
  {
    id: 2,
    name: "Cafe Mocha",
    image: "https://source.unsplash.com/random/400x250/?cafe,cozy",
    speciality: "Artisan Coffee & Desserts",
    rating: 4.6,
    reviewCount: 892,
    location: "CP, New Delhi",
    distance: "1.8 km",
    priceRange: "₹250-500",
    features: ["Book Reading Corner", "Board Games", "Live Acoustic"],
    amenities: ["WiFi", "Books", "Pet Friendly", "Live Music"],
    status: "Open",
    isLiked: true,
    images: [
      "https://source.unsplash.com/random/400x250/?cafe,cozy",
      "https://source.unsplash.com/random/400x250/?books,coffee",
      "https://source.unsplash.com/random/400x250/?dessert,cake"
    ],
    popularItems: ["Hazelnut Latte", "Cheesecake", "Hot Chocolate"],
    workingHours: "8:00 AM - 11:00 PM",
    atmosphere: "Cozy and relaxed vibes",
    instagramWorthy: true
  },
  {
    id: 3,
    name: "The Coffee Bean & Tea Leaf",
    image: "https://source.unsplash.com/random/400x250/?coffee,modern",
    speciality: "International Coffee & Tea",
    rating: 4.7,
    reviewCount: 756,
    location: "GK-1, New Delhi",
    distance: "3.1 km",
    priceRange: "₹400-700",
    features: ["Study Zone", "Meeting Rooms", "Power Outlets"],
    amenities: ["WiFi", "Meeting Rooms", "AC", "Charging Points"],
    status: "Open",
    isLiked: false,
    images: [
      "https://source.unsplash.com/random/400x250/?coffee,modern",
      "https://source.unsplash.com/random/400x250/?study,workspace",
      "https://source.unsplash.com/random/400x250/?tea,varieties"
    ],
    popularItems: ["Vanilla Latte", "Earl Grey", "Blueberry Muffin"],
    workingHours: "6:30 AM - 12:00 AM",
    atmosphere: "Modern workspace friendly",
    instagramWorthy: false
  },
  {
    id: 4,
    name: "Starbucks Coffee",
    image: "https://source.unsplash.com/random/400x250/?starbucks,cafe",
    speciality: "Global Coffee Chain",
    rating: 4.4,
    reviewCount: 2341,
    location: "Select City Walk, Saket",
    distance: "4.2 km",
    priceRange: "₹350-800",
    features: ["Drive Thru", "Mobile Ordering", "Rewards Program"],
    amenities: ["WiFi", "Drive Thru", "AC", "Mobile App"],
    status: "Open",
    isLiked: false,
    images: [
      "https://source.unsplash.com/random/400x250/?starbucks,cafe",
      "https://source.unsplash.com/random/400x250/?frappuccino,drink",
      "https://source.unsplash.com/random/400x250/?pastry,sandwich"
    ],
    popularItems: ["Caramel Macchiato", "Frappuccino", "Sandwich"],
    workingHours: "7:00 AM - 11:00 PM",
    atmosphere: "Consistent and familiar",
    instagramWorthy: true
  }
];

const CafesList = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [likedCafes, setLikedCafes] = useState(new Set([2]));
  const { toast } = useToast();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-green-600 bg-green-100';
      case 'Busy': return 'text-orange-600 bg-orange-100';
      case 'Closed': return 'text-red-600 bg-red-100';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'WiFi': return <Wifi className="w-3 h-3" />;
      case 'Parking': return <Car className="w-3 h-3" />;
      case 'Live Music': return <Music className="w-3 h-3" />;
      case 'Card Payment': return <CreditCard className="w-3 h-3" />;
      default: return <Coffee className="w-3 h-3" />;
    }
  };

  const toggleLike = (cafeId) => {
    const newLiked = new Set(likedCafes);
    if (newLiked.has(cafeId)) {
      newLiked.delete(cafeId);
    } else {
      newLiked.add(cafeId);
    }
    setLikedCafes(newLiked);
    toast({
      title: newLiked.has(cafeId) ? "Added to Favorites ❤️" : "Removed from Favorites",
      description: newLiked.has(cafeId) ? "Cafe saved to your favorites" : "Cafe removed from favorites",
    });
  };

  const shareCafe = (cafe) => {
    if (navigator.share) {
      navigator.share({
        title: cafe.name,
        text: `Check out ${cafe.name} - ${cafe.speciality}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied! 📋",
        description: "Cafe link copied to clipboard",
      });
    }
  };

  const filteredCafes = cafes.filter(cafe => {
    const matchesSearch = cafe.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
                         cafe.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
                         cafe.speciality.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesSpeciality = selectedSpeciality === 'all' || cafe.speciality.toLowerCase().includes(selectedSpeciality);
    const priceNum = parseInt(cafe.priceRange.split('-')[1].replace('₹', ''));
    const matchesPrice = selectedPriceRange === 'all' || 
                        (selectedPriceRange === 'budget' && priceNum < 400) ||
                        (selectedPriceRange === 'mid' && priceNum >= 400 && priceNum <= 600) ||
                        (selectedPriceRange === 'premium' && priceNum > 600);
    
    return matchesSearch && matchesSpeciality && matchesPrice;
  });

  const sortedCafes = [...filteredCafes].sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating;
      case 'distance': return parseFloat(a.distance) - parseFloat(b.distance);
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-background to-orange-50">
      <BlurredBackground>
        <div />
      </BlurredBackground>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Coffee & Cafes
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover the perfect spot for your coffee cravings and work sessions
          </p>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col gap-4 max-w-6xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Search cafes, speciality, or location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
                <Coffee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            
            {/* Filter Row */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-card rounded-lg border animate-fade-in">
                <Select value={selectedSpeciality} onValueChange={setSelectedSpeciality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Speciality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialities</SelectItem>
                    <SelectItem value="specialty coffee">Specialty Coffee</SelectItem>
                    <SelectItem value="artisan">Artisan Coffee</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="budget">Budget (Under ₹400)</SelectItem>
                    <SelectItem value="mid">Mid-range (₹400-₹600)</SelectItem>
                    <SelectItem value="premium">Premium (Above ₹600)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCafes.map((cafe) => (
            <GlassmorphicCard key={cafe.id} className="group hover:scale-[1.02] transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={cafe.image} 
                  alt={cafe.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Top badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {cafe.instagramWorthy && (
                    <Badge className="bg-pink-500 text-white font-semibold shadow-lg">
                      📸 Instagram Worthy
                    </Badge>
                  )}
                </div>
                
                {/* Top right icons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(cafe.id);
                      }}
                    >
                      <Heart 
                        className={`w-4 h-4 ${likedCafes.has(cafe.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        shareCafe(cafe);
                      }}
                    >
                      <Share2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="bg-white/95 text-primary border-primary/20">
                    <Star className="w-3 h-3 mr-1 fill-current text-amber-500" />
                    {cafe.rating}
                  </Badge>
                </div>
                
                {/* Status badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge className={`${getStatusColor(cafe.status)} border-0`}>
                    {cafe.status}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {cafe.name}
                  </h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{cafe.speciality}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {cafe.location}
                  </div>
                  <span>{cafe.distance}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {cafe.workingHours}
                  </div>
                  <span className="font-semibold text-primary">{cafe.priceRange}</span>
                </div>
                
                {/* Popular items */}
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Popular:</p>
                  <div className="flex flex-wrap gap-1">
                    {cafe.popularItems.slice(0, 2).map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cafe.amenities.slice(0, 4).map((amenity, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Coffee className="w-4 h-4 mr-2" />
                    Menu
                  </Button>
                </div>
              </div>
            </GlassmorphicCard>
          ))}
        </div>
        
        {sortedCafes.length === 0 && (
          <div className="text-center py-12">
            <Coffee className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No cafes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CafesList;