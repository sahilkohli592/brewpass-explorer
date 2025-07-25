
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Coffee, ArrowRight, Phone, Map, Star, ThumbsUp, Tag, Ticket } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import BlurredBackground from '@/components/ui/BlurredBackground';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dummy data - would come from an API in a real app
const cafesData = [
  {
    id: 1,
    name: "Blue Tokai Coffee",
    address: "Khan Market, New Delhi",
    specialty: "Single Origin Pour Overs",
    image: "https://source.unsplash.com/random/300x200/?coffee,cafe",
    phone: "+91 98765 43210",
    rating: 4.8,
    menu: ["Espresso", "Cappuccino", "Pour Over", "Cold Brew", "Snacks"],
    recommended: ["House Special Pour Over", "Blueberry Cheesecake"],
    vouchers: [
      { id: "V001", title: "20% Off First Order", description: "Get 20% off on your first purchase", type: "discount" },
      { id: "V002", title: "Free Coffee", description: "Buy 3 coffees, get 1 free", type: "freebie" }
    ],
    discounts: [
      { title: "Student Discount", description: "15% off with valid student ID" },
      { title: "Weekend Special", description: "Buy 2 pastries, get 1 free on weekends" }
    ],
    location: {
      lat: 28.6006,
      lng: 77.2272
    }
  },
  {
    id: 2,
    name: "Third Wave Coffee",
    address: "Indiranagar, Bangalore",
    specialty: "Specialty Coffee & Pastries",
    image: "https://source.unsplash.com/random/300x200/?coffee,shop",
    phone: "+91 98765 12345",
    rating: 4.5,
    menu: ["Latte", "Flat White", "Americano", "Croissants", "Cakes"],
    recommended: ["Signature Flat White", "Chocolate Croissant"],
    vouchers: [
      { id: "V003", title: "₹50 Off", description: "₹50 off on orders above ₹300", type: "discount" }
    ],
    discounts: [
      { title: "Early Bird Special", description: "25% off on orders before 10 AM" },
      { title: "Corporate Discount", description: "10% off for corporate employees" }
    ],
    location: {
      lat: 12.9784,
      lng: 77.6408
    }
  },
  {
    id: 3,
    name: "Starbucks",
    address: "Connaught Place, New Delhi",
    specialty: "Frappuccinos & Cold Brews",
    image: "https://source.unsplash.com/random/300x200/?starbucks",
    phone: "+91 11 2334 5678",
    rating: 4.2,
    menu: ["Frappuccino", "Cold Brew", "Latte", "Macchiato", "Sandwiches"],
    recommended: ["Java Chip Frappuccino", "Protein Box"],
    vouchers: [
      { id: "V004", title: "Happy Hour", description: "Buy 1 Get 1 on all frappuccinos (3-5 PM)", type: "bogo" },
      { id: "V005", title: "Loyalty Reward", description: "Free drink on your 10th visit", type: "freebie" }
    ],
    discounts: [
      { title: "Birthday Special", description: "Free birthday drink with any purchase" }
    ],
    location: {
      lat: 28.6315,
      lng: 77.2167
    }
  },
  {
    id: 4,
    name: "Roastery Coffee House",
    address: "Banjara Hills, Hyderabad",
    specialty: "House-roasted Specialty Coffee",
    image: "https://source.unsplash.com/random/300x200/?roastery",
    phone: "+91 98450 67890",
    rating: 4.7,
    menu: ["Pour Over", "Aeropress", "Espresso", "Breakfast", "Lunch"],
    recommended: ["Ethiopian Single Origin", "Avocado Toast"],
    vouchers: [
      { id: "V006", title: "Coffee Bean Discount", description: "30% off on all coffee beans", type: "discount" }
    ],
    discounts: [
      { title: "Combo Deal", description: "Coffee + Breakfast combo for ₹250" },
      { title: "Senior Citizen", description: "20% off for customers above 60" }
    ],
    location: {
      lat: 17.4256,
      lng: 78.4542
    }
  },
  {
    id: 5,
    name: "Café Coffee Day",
    address: "MG Road, Bangalore",
    specialty: "Signature Cold Coffee",
    image: "https://source.unsplash.com/random/300x200/?cafe,india",
    phone: "+91 80 2558 9999",
    rating: 4.0,
    menu: ["Devil's Own", "Tropical Iceberg", "Sandwiches", "Desserts"],
    recommended: ["Devil's Own", "Choco Fantasy"],
    vouchers: [
      { id: "V007", title: "CCD Special", description: "₹100 off on orders above ₹500", type: "discount" }
    ],
    discounts: [
      { title: "Group Discount", description: "15% off for groups of 4 or more" },
      { title: "Afternoon Delight", description: "Free dessert with any cold coffee (2-4 PM)" }
    ],
    location: {
      lat: 12.9719,
      lng: 77.6412
    }
  },
  {
    id: 6,
    name: "Araku Coffee",
    address: "Indiranagar, Bangalore",
    specialty: "Specialty Indian Coffee",
    image: "https://source.unsplash.com/random/300x200/?coffee,beans",
    phone: "+91 80 4123 4567",
    rating: 4.6,
    menu: ["Filter Coffee", "French Press", "Muffins", "Cookies"],
    recommended: ["Araku Signature Filter Coffee", "Chocolate Chip Cookie"],
    vouchers: [
      { id: "V008", title: "Filter Coffee Special", description: "Buy 2 filter coffees, get 1 free", type: "bogo" }
    ],
    discounts: [
      { title: "Local Special", description: "10% off for Bangalore residents with address proof" },
      { title: "First Time Visitor", description: "Complimentary cookie with any coffee" }
    ],
    location: {
      lat: 12.9783,
      lng: 77.6408
    }
  }
];

const CafesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCafes, setFilteredCafes] = useState(cafesData);
  const [selectedCafe, setSelectedCafe] = useState<typeof cafesData[0] | null>(null);

  useEffect(() => {
    // Filter cafes based on search term
    const results = cafesData.filter(cafe =>
      cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cafe.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cafe.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCafes(results);
  }, [searchTerm]);

  const handleViewDetails = (cafe: typeof cafesData[0]) => {
    setSelectedCafe(cafe);
  };

  const handleOpenDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return <div className="flex">{stars}</div>;
  };

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
                  <div className="flex items-center text-sm text-foreground/70 mb-2">
                    <Coffee className="w-4 h-4 mr-1" /> 
                    <span>{cafe.specialty}</span>
                  </div>
                  <div className="flex items-center text-sm text-foreground/70 mb-2">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>{cafe.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-foreground/70 mb-4">
                    {renderStars(cafe.rating)}
                    <span className="ml-2">{cafe.rating.toFixed(1)}</span>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full group"
                        onClick={() => handleViewDetails(cafe)}
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{cafe.name}</DialogTitle>
                        <DialogDescription>{cafe.address}</DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 mt-4">
                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                          <div className="flex">{renderStars(cafe.rating)}</div>
                          <span className="font-medium">{cafe.rating.toFixed(1)}</span>
                        </div>
                        
                        {/* Contact */}
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-primary" />
                          <span>{cafe.phone}</span>
                        </div>
                        
                        {/* Menu */}
                        <div>
                          <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <Coffee className="h-5 w-5 mr-2 text-primary" />
                            Menu
                          </h3>
                          <Card className="bg-muted/50">
                            <CardContent className="pt-4">
                              <ul className="grid grid-cols-2 gap-2">
                                {cafe.menu.map((item, idx) => (
                                  <li key={idx} className="text-sm">• {item}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Recommended */}
                        <div>
                          <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <ThumbsUp className="h-5 w-5 mr-2 text-primary" />
                            Recommended
                          </h3>
                          <Card className="bg-muted/50">
                            <CardContent className="pt-4">
                              <ul className="space-y-1">
                                {cafe.recommended.map((item, idx) => (
                                  <li key={idx} className="text-sm">• {item}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Vouchers */}
                        {cafe.vouchers && cafe.vouchers.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                              <Ticket className="h-5 w-5 mr-2 text-primary" />
                              Active Vouchers
                            </h3>
                            <div className="space-y-2">
                              {cafe.vouchers.map((voucher, idx) => (
                                <Card key={idx} className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                                  <CardContent className="pt-3 pb-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <h4 className="font-medium text-sm">{voucher.title}</h4>
                                        <p className="text-xs text-muted-foreground">{voucher.description}</p>
                                      </div>
                                      <Badge variant="secondary" className="text-xs">
                                        {voucher.type === 'discount' && 'Discount'}
                                        {voucher.type === 'freebie' && 'Free'}
                                        {voucher.type === 'bogo' && 'BOGO'}
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Discounts */}
                        {cafe.discounts && cafe.discounts.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                              <Tag className="h-5 w-5 mr-2 text-primary" />
                              Special Offers
                            </h3>
                            <div className="space-y-2">
                              {cafe.discounts.map((discount, idx) => (
                                <Card key={idx} className="bg-muted/50">
                                  <CardContent className="pt-3 pb-3">
                                    <h4 className="font-medium text-sm">{discount.title}</h4>
                                    <p className="text-xs text-muted-foreground">{discount.description}</p>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Directions */}
                        <Button 
                          className="w-full" 
                          onClick={() => handleOpenDirections(cafe.location.lat, cafe.location.lng)}
                        >
                          <Map className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
