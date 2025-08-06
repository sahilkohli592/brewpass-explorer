import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, Star, Utensils, Gift, CheckCircle, Phone, Filter, Heart, Share2, Camera, Wifi, Car, Music, CreditCard, Timer, TrendingUp, Award, Shield } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import TableBookingForm from '@/components/dineout/TableBookingForm';
import PreOrderMenu from '@/components/dineout/PreOrderMenu';

const dineoutDeals = [
  {
    id: 1,
    restaurant: "Blue Tokai Coffee",
    image: "https://source.unsplash.com/random/400x250/?restaurant,dining",
    cuisine: "Coffee & Continental",
    rating: 4.8,
    reviewCount: 1205,
    location: "Khan Market, New Delhi",
    distance: "2.3 km",
    originalPrice: 800,
    dineoutPrice: 600,
    discount: 25,
    offer: "25% off total bill",
    validUntil: "2024-12-31",
    features: ["Table Booking", "Pre-order", "Live Music"],
    amenities: ["WiFi", "Parking", "AC", "Card Payment"],
    timeSlots: ["12:00 PM", "2:00 PM", "6:00 PM", "8:00 PM"],
    availableTables: 8,
    phone: "+91 98765 43210",
    status: "Open",
    isLiked: false,
    images: [
      "https://source.unsplash.com/random/400x250/?restaurant,dining",
      "https://source.unsplash.com/random/400x250/?coffee,interior",
      "https://source.unsplash.com/random/400x250/?food,restaurant"
    ],
    popularDishes: ["Espresso", "Avocado Toast", "Croissant"],
    happyHours: "4:00 PM - 7:00 PM",
    averageTime: "45 mins",
    costForTwo: "₹800",
    safetyBadge: true,
    trending: true
  },
  {
    id: 2,
    restaurant: "Cafe Mocha",
    image: "https://source.unsplash.com/random/400x250/?cafe,interior",
    cuisine: "Italian & Mexican",
    rating: 4.6,
    reviewCount: 892,
    location: "CP, New Delhi",
    distance: "1.8 km",
    originalPrice: 1200,
    dineoutPrice: 900,
    discount: 25,
    offer: "Buy 1 Get 1 on beverages",
    validUntil: "2024-12-31",
    features: ["Rooftop Seating", "Wi-Fi", "Pet Friendly"],
    amenities: ["WiFi", "Rooftop", "Pet Friendly", "Live Music"],
    timeSlots: ["11:00 AM", "1:00 PM", "5:00 PM", "7:00 PM"],
    availableTables: 12,
    phone: "+91 87654 32109",
    status: "Open",
    isLiked: true,
    images: [
      "https://source.unsplash.com/random/400x250/?cafe,interior",
      "https://source.unsplash.com/random/400x250/?rooftop,dining",
      "https://source.unsplash.com/random/400x250/?pizza,pasta"
    ],
    popularDishes: ["Margherita Pizza", "Pasta Alfredo", "Mojito"],
    happyHours: "5:00 PM - 8:00 PM",
    averageTime: "35 mins",
    costForTwo: "₹1200",
    safetyBadge: true,
    trending: false
  },
  {
    id: 3,
    restaurant: "The Coffee Bean",
    image: "https://source.unsplash.com/random/400x250/?coffee,brunch",
    cuisine: "Continental & Asian",
    rating: 4.7,
    reviewCount: 756,
    location: "GK-1, New Delhi",
    distance: "3.1 km",
    originalPrice: 1000,
    dineoutPrice: 750,
    discount: 25,
    offer: "Free dessert with main course",
    validUntil: "2024-12-31",
    features: ["Outdoor Seating", "Brunch Menu", "Parking"],
    amenities: ["Parking", "Outdoor Seating", "Brunch", "AC"],
    timeSlots: ["10:00 AM", "12:30 PM", "3:00 PM", "6:30 PM"],
    availableTables: 6,
    phone: "+91 76543 21098",
    status: "Busy",
    isLiked: false,
    images: [
      "https://source.unsplash.com/random/400x250/?coffee,brunch",
      "https://source.unsplash.com/random/400x250/?outdoor,dining",
      "https://source.unsplash.com/random/400x250/?dessert,cake"
    ],
    popularDishes: ["Eggs Benedict", "French Toast", "Cold Brew"],
    happyHours: "3:00 PM - 6:00 PM",
    averageTime: "40 mins",
    costForTwo: "₹1000",
    safetyBadge: true,
    trending: true
  }
];

const DineOut = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [bookingStep, setBookingStep] = useState('browse'); // browse, book, confirm
  const [searchLocation, setSearchLocation] = useState('');
  const [preOrderItems, setPreOrderItems] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [likedRestaurants, setLikedRestaurants] = useState(new Set([2]));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  const menuItems = [
    { id: 1, name: "Espresso", price: 150, category: "Beverages" },
    { id: 2, name: "Cappuccino", price: 200, category: "Beverages" },
    { id: 3, name: "Avocado Toast", price: 350, category: "Food" },
    { id: 4, name: "Chicken Sandwich", price: 450, category: "Food" },
    { id: 5, name: "Tiramisu", price: 250, category: "Desserts" }
  ];

  const handleBookTable = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setBookingStep('book');
  };

  const confirmBooking = () => {
    if (!selectedDate || !selectedTime || !partySize) {
      toast({
        title: "Missing Information",
        description: "Please fill in all booking details",
        variant: "destructive"
      });
      return;
    }

    setBookingStep('confirm');
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Table booked at ${selectedRestaurant.restaurant} for ${partySize} people on ${selectedDate} at ${selectedTime}`,
    });
  };

  const handlePreOrder = (item) => {
    setPreOrderItems([...preOrderItems, item]);
    toast({
      title: "Added to Pre-order",
      description: `${item.name} added to your pre-order`,
    });
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    toast({
      title: "Checked In Successfully! ✅",
      description: "Enjoy your dining experience. Your table is ready!",
    });
  };

  const getTimeUntilSlot = (timeSlot) => {
    const now = new Date();
    const [time, period] = timeSlot.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);
    
    if (period === 'PM' && hour24 !== 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;
    
    const slotTime = new Date();
    slotTime.setHours(hour24, parseInt(minutes), 0, 0);
    
    const diff = slotTime.getTime() - now.getTime();
    const hoursUntil = Math.floor(diff / (1000 * 60 * 60));
    
    if (hoursUntil < 0) return "Past";
    if (hoursUntil === 0) return "Now";
    return `${hoursUntil}h`;
  };

  const toggleLike = (restaurantId) => {
    const newLiked = new Set(likedRestaurants);
    if (newLiked.has(restaurantId)) {
      newLiked.delete(restaurantId);
    } else {
      newLiked.add(restaurantId);
    }
    setLikedRestaurants(newLiked);
    toast({
      title: newLiked.has(restaurantId) ? "Added to Favorites ❤️" : "Removed from Favorites",
      description: newLiked.has(restaurantId) ? "Restaurant saved to your favorites" : "Restaurant removed from favorites",
    });
  };

  const shareRestaurant = (restaurant) => {
    if (navigator.share) {
      navigator.share({
        title: restaurant.restaurant,
        text: `Check out ${restaurant.restaurant} - ${restaurant.offer}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied! 📋",
        description: "Restaurant link copied to clipboard",
      });
    }
  };

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
      default: return <CheckCircle className="w-3 h-3" />;
    }
  };

  const filteredDeals = dineoutDeals.filter(deal => {
    const matchesSearch = deal.restaurant.toLowerCase().includes(searchLocation.toLowerCase()) ||
                         deal.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
                         deal.cuisine.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || deal.cuisine.toLowerCase().includes(selectedCuisine);
    const matchesPrice = selectedPriceRange === 'all' || 
                        (selectedPriceRange === 'budget' && deal.dineoutPrice < 600) ||
                        (selectedPriceRange === 'mid' && deal.dineoutPrice >= 600 && deal.dineoutPrice <= 1000) ||
                        (selectedPriceRange === 'premium' && deal.dineoutPrice > 1000);
    
    return matchesSearch && matchesCuisine && matchesPrice;
  });

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating;
      case 'price-low': return a.dineoutPrice - b.dineoutPrice;
      case 'price-high': return b.dineoutPrice - a.dineoutPrice;
      case 'distance': return parseFloat(a.distance) - parseFloat(b.distance);
      case 'discount': return b.discount - a.discount;
      default: return 0;
    }
  });

  // Auto-advance image carousel
  useEffect(() => {
    if (selectedRestaurant && selectedRestaurant.images) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === selectedRestaurant.images.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedRestaurant]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <BlurredBackground>
        <div /></BlurredBackground>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DineOut Deals
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Book tables, get amazing deals, and enjoy seamless dining experiences
          </p>
          
          {/* Enhanced Search and Filter Bar */}
          <div className="flex flex-col gap-4 max-w-6xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Search restaurants, cuisine, or location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-card rounded-lg border animate-fade-in">
                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="Cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cuisines</SelectItem>
                    <SelectItem value="coffee">Coffee & Cafe</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="continental">Continental</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="budget">Budget (Under ₹600)</SelectItem>
                    <SelectItem value="mid">Mid-range (₹600-₹1000)</SelectItem>
                    <SelectItem value="premium">Premium (Above ₹1000)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="discount">Best Discount</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={partySize} onValueChange={setPartySize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Party Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3">3 People</SelectItem>
                    <SelectItem value="4">4 People</SelectItem>
                    <SelectItem value="5+">5+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {bookingStep === 'browse' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDeals.map((deal) => (
              <GlassmorphicCard key={deal.id} className="group hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={deal.image} 
                    alt={deal.restaurant}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-accent text-accent-foreground font-semibold shadow-lg">
                      {deal.discount}% OFF
                    </Badge>
                    {deal.trending && (
                      <Badge className="bg-red-500 text-white font-semibold shadow-lg">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
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
                          toggleLike(deal.id);
                        }}
                      >
                        <Heart 
                          className={`w-4 h-4 ${likedRestaurants.has(deal.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          shareRestaurant(deal);
                        }}
                      >
                        <Share2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <Badge variant="outline" className="bg-white/95 text-primary border-primary/20">
                      <Star className="w-3 h-3 mr-1 fill-current text-amber-500" />
                      {deal.rating}
                    </Badge>
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute bottom-3 left-3">
                    <Badge className={`${getStatusColor(deal.status)} border-0 font-medium`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${deal.status === 'Open' ? 'bg-green-500' : deal.status === 'Busy' ? 'bg-orange-500' : 'bg-red-500'}`} />
                      {deal.status}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                        {deal.restaurant}
                        {deal.safetyBadge && (
                          <Shield className="w-4 h-4 text-green-600" />
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Utensils className="w-3 h-3" />
                        {deal.cuisine}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {deal.location}
                      </span>
                      <span className="text-muted-foreground">{deal.distance}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-muted-foreground">
                        <Timer className="w-3 h-3 mr-1" />
                        {deal.averageTime}
                      </span>
                      <span className="text-muted-foreground">{deal.costForTwo} for two</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Happy Hours: {deal.happyHours}
                      </span>
                    </div>
                  </div>
                  
                  {/* Price section */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-green-600">₹{deal.dineoutPrice}</span>
                    <span className="text-lg text-muted-foreground line-through">₹{deal.originalPrice}</span>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      Save ₹{deal.originalPrice - deal.dineoutPrice}
                    </Badge>
                  </div>
                  
                  {/* Offer section */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-accent mb-2 flex items-center">
                      <Gift className="w-4 h-4 mr-1" />
                      {deal.offer}
                    </p>
                    
                    {/* Popular dishes */}
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Popular:</p>
                      <div className="flex flex-wrap gap-1">
                        {deal.popularDishes.slice(0, 3).map((dish, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {dish}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {deal.amenities.slice(0, 4).map((amenity, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Reviews and availability */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-muted-foreground">{deal.reviewCount} reviews</span>
                    <span className="text-muted-foreground">{deal.availableTables} tables available</span>
                  </div>
                  
                  <Button 
                    onClick={() => handleBookTable(deal)} 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    size="lg"
                  >
                    Book Table Now
                  </Button>
                </CardContent>
              </GlassmorphicCard>
            ))}
          </div>
        )}

        {bookingStep === 'book' && selectedRestaurant && (
          <div className="max-w-6xl mx-auto">
            <Button 
              onClick={() => setBookingStep('browse')} 
              variant="outline" 
              className="mb-6"
            >
              ← Back to Restaurants
            </Button>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Restaurant Details Section */}
              <div className="lg:col-span-1">
                <GlassmorphicCard className="p-6 sticky top-6">
                  <div className="relative mb-4">
                    <img 
                      src={selectedRestaurant.images[currentImageIndex]} 
                      alt={selectedRestaurant.restaurant}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-semibold text-lg">{selectedRestaurant.restaurant}</h3>
                      <p className="text-sm opacity-90">{selectedRestaurant.location}</p>
                    </div>
                    
                    {/* Image indicators */}
                    <div className="absolute bottom-3 right-3 flex gap-1">
                      {selectedRestaurant.images.map((_, index) => (
                        <div 
                          key={index}
                          className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-accent text-accent-foreground">
                        {selectedRestaurant.discount}% OFF
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span className="font-medium">{selectedRestaurant.rating}</span>
                        <span className="text-sm text-muted-foreground">({selectedRestaurant.reviewCount})</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <p className="text-accent font-medium flex items-center">
                        <Gift className="w-4 h-4 mr-2" />
                        {selectedRestaurant.offer}
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Cost for two:</span>
                        <span className="font-medium">{selectedRestaurant.costForTwo}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Happy Hours:</span>
                        <span className="font-medium">{selectedRestaurant.happyHours}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Average Time:</span>
                        <span className="font-medium">{selectedRestaurant.averageTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedRestaurant.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassmorphicCard>
              </div>
              
              {/* Booking Form Section */}
              <div className="lg:col-span-2">
                <GlassmorphicCard className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Book Your Table</h2>
                  
                  <TableBookingForm
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    partySize={partySize}
                    setPartySize={setPartySize}
                    restaurant={selectedRestaurant}
                    onConfirm={confirmBooking}
                    getTimeUntilSlot={getTimeUntilSlot}
                  />
                  
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex flex-col md:flex-row gap-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => window.open(`tel:${selectedRestaurant.phone}`)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Restaurant
                      </Button>
                    </div>
                  </div>
                </GlassmorphicCard>
              </div>
              
              {/* Pre-Order Section */}
              <div className="lg:col-span-3">
                <GlassmorphicCard className="p-8 mt-6">
                  <PreOrderMenu
                    restaurant={selectedRestaurant}
                    preOrderItems={preOrderItems}
                    setPreOrderItems={setPreOrderItems}
                    onAddItem={handlePreOrder}
                  />
                </GlassmorphicCard>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'confirm' && selectedRestaurant && (
          <div className="max-w-2xl mx-auto">
            <GlassmorphicCard className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
              
              <Card className="p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4">Booking Details</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span>Restaurant:</span>
                    <span className="font-medium">{selectedRestaurant.restaurant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Party Size:</span>
                    <span className="font-medium">{partySize} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-medium">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </div>
                </div>
              </Card>
              
              {!isCheckedIn ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Check in when you arrive at the restaurant to activate your deal
                  </p>
                  <Button 
                    onClick={handleCheckIn} 
                    size="lg" 
                    className="w-full"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Check In Now
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-medium">
                      You're checked in! Enjoy your meal with {selectedRestaurant.offer}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setBookingStep('browse')} 
                  className="flex-1"
                >
                  Book Another Table
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open(`tel:${selectedRestaurant.phone}`)}
                  className="flex-1"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Restaurant
                </Button>
              </div>
            </GlassmorphicCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default DineOut;