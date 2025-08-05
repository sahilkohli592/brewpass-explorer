import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Star, Utensils, Gift, CheckCircle, Phone } from 'lucide-react';
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

const dineoutDeals = [
  {
    id: 1,
    restaurant: "Blue Tokai Coffee",
    image: "https://source.unsplash.com/random/400x250/?restaurant,dining",
    cuisine: "Coffee & Continental",
    rating: 4.8,
    location: "Khan Market, New Delhi",
    originalPrice: 800,
    dineoutPrice: 600,
    discount: 25,
    offer: "25% off total bill",
    validUntil: "2024-12-31",
    features: ["Table Booking", "Pre-order", "Live Music"],
    timeSlots: ["12:00 PM", "2:00 PM", "6:00 PM", "8:00 PM"],
    availableTables: 8,
    phone: "+91 98765 43210"
  },
  {
    id: 2,
    restaurant: "Cafe Mocha",
    image: "https://source.unsplash.com/random/400x250/?cafe,interior",
    cuisine: "Italian & Mexican",
    rating: 4.6,
    location: "CP, New Delhi",
    originalPrice: 1200,
    dineoutPrice: 900,
    discount: 25,
    offer: "Buy 1 Get 1 on beverages",
    validUntil: "2024-12-31",
    features: ["Rooftop Seating", "Wi-Fi", "Pet Friendly"],
    timeSlots: ["11:00 AM", "1:00 PM", "5:00 PM", "7:00 PM"],
    availableTables: 12,
    phone: "+91 87654 32109"
  },
  {
    id: 3,
    restaurant: "The Coffee Bean",
    image: "https://source.unsplash.com/random/400x250/?coffee,brunch",
    cuisine: "Continental & Asian",
    rating: 4.7,
    location: "GK-1, New Delhi",
    originalPrice: 1000,
    dineoutPrice: 750,
    discount: 25,
    offer: "Free dessert with main course",
    validUntil: "2024-12-31",
    features: ["Outdoor Seating", "Brunch Menu", "Parking"],
    timeSlots: ["10:00 AM", "12:30 PM", "3:00 PM", "6:30 PM"],
    availableTables: 6,
    phone: "+91 76543 21098"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <BlurredBackground>
        <div /></BlurredBackground>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            DineOut Deals
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Book tables, get amazing deals, and enjoy seamless dining experiences
          </p>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
            <Input
              placeholder="Search by location, restaurant, or cuisine"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="flex-1"
            />
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Cuisine Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                <SelectItem value="coffee">Coffee & Cafe</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="continental">Continental</SelectItem>
                <SelectItem value="asian">Asian</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="People" />
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
        </div>

        {bookingStep === 'browse' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dineoutDeals.map((deal) => (
              <GlassmorphicCard key={deal.id} className="group hover:scale-105 transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={deal.image} 
                    alt={deal.restaurant}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-green-500/90 text-white">
                      {deal.discount}% OFF
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 text-primary">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {deal.rating}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{deal.restaurant}</h3>
                  <p className="text-muted-foreground mb-2 flex items-center">
                    <Utensils className="w-4 h-4 mr-2" />
                    {deal.cuisine}
                  </p>
                  <p className="text-muted-foreground mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {deal.location}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-600">₹{deal.dineoutPrice}</span>
                    <span className="text-lg text-muted-foreground line-through">₹{deal.originalPrice}</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-green-600 mb-2">
                      <Gift className="w-4 h-4 inline mr-1" />
                      {deal.offer}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {deal.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Available tables: {deal.availableTables}</span>
                    <span className="text-sm text-muted-foreground">Valid till: {new Date(deal.validUntil).toLocaleDateString()}</span>
                  </div>
                  
                  <Button 
                    onClick={() => handleBookTable(deal)} 
                    className="w-full"
                    size="lg"
                  >
                    Book Table
                  </Button>
                </CardContent>
              </GlassmorphicCard>
            ))}
          </div>
        )}

        {bookingStep === 'book' && selectedRestaurant && (
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={() => setBookingStep('browse')} 
              variant="outline" 
              className="mb-6"
            >
              ← Back to Restaurants
            </Button>
            
            <GlassmorphicCard className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Book Your Table</h2>
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg">{selectedRestaurant.restaurant}</h3>
                    <p className="text-muted-foreground">{selectedRestaurant.location}</p>
                    <p className="text-green-600 font-medium">{selectedRestaurant.offer}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Date</label>
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Time</label>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedRestaurant.timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedTime === slot ? "default" : "outline"}
                            onClick={() => setSelectedTime(slot)}
                            className="text-sm"
                          >
                            {slot}
                            <span className="text-xs ml-1">({getTimeUntilSlot(slot)})</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Party Size</label>
                      <Select value={partySize} onValueChange={setPartySize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of people" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Person' : 'People'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                      <Textarea placeholder="Any special requirements or dietary restrictions..." />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Pre-Order Menu</h3>
                  <p className="text-muted-foreground mb-4">Save time by pre-ordering your favorites</p>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {menuItems.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <p className="font-semibold text-green-600">₹{item.price}</p>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => handlePreOrder(item)}
                            variant="outline"
                          >
                            Add
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {preOrderItems.length > 0 && (
                    <Card className="mt-4 p-4">
                      <h4 className="font-medium mb-2">Pre-Order Summary</h4>
                      <div className="space-y-1">
                        {preOrderItems.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span>₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total Pre-Order:</span>
                          <span>₹{preOrderItems.reduce((sum, item) => sum + item.price, 0)}</span>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-col md:flex-row gap-4">
                  <Button onClick={confirmBooking} className="flex-1" size="lg">
                    Confirm Booking
                  </Button>
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