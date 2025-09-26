import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, ArrowRight } from 'lucide-react';

const NearbyCafes = () => {
  // Mock data for active cafes
  const activeCafes = [
    {
      id: 1,
      name: "Brew & Beans",
      distance: "0.2 km",
      rating: 4.8,
      status: "Open",
      estimatedTime: "15-20 min",
      offers: ["20% OFF", "Free Delivery"],
      image: "/assets/cafe-interior.jpg"
    },
    {
      id: 2,
      name: "Coffee Central",
      distance: "0.5 km",
      rating: 4.6,
      status: "Open",
      estimatedTime: "20-25 min",
      offers: ["Buy 2 Get 1"],
      image: "/assets/cafe-outdoor.jpg"
    },
    {
      id: 3,
      name: "Urban Grind",
      distance: "0.8 km",
      rating: 4.7,
      status: "Closing Soon",
      estimatedTime: "25-30 min",
      offers: ["Happy Hour"],
      image: "/assets/cafe-interior.jpg"
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Nearby Cafes</h2>
            <p className="text-muted-foreground">Active cafes around you</p>
          </div>
          <Link to="/cafes">
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCafes.map((cafe) => (
            <Card key={cafe.id} className="card-hover overflow-hidden group cursor-pointer">
              <div className="relative h-40 bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary">{cafe.name}</h3>
                  <p className="text-sm text-muted-foreground">{cafe.distance} away</p>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{cafe.rating}</span>
                  </div>
                  <Badge 
                    variant={cafe.status === "Open" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {cafe.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 mb-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{cafe.estimatedTime}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {cafe.offers.map((offer, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {offer}
                    </Badge>
                  ))}
                </div>

                <Link to={`/cafes/${cafe.id}`}>
                  <Button className="w-full" size="sm">
                    Order Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyCafes;