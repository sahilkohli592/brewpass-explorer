import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Percent, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HeroBanner = () => {
  const offers = [
    {
      title: "50% OFF",
      subtitle: "First Order",
      description: "New users get 50% off on first cafe order",
      code: "WELCOME50",
      icon: <Percent className="w-5 h-5" />
    },
    {
      title: "Buy 2 Get 1",
      subtitle: "Coffee Special",
      description: "Valid on all premium coffee drinks",
      code: "COFFEE3",
      icon: <Gift className="w-5 h-5" />
    }
  ];

  return (
    <div className="relative pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Hero Content */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Premium Coffee Experience
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Coffee Journey
            <span className="block">Starts Here</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover amazing cafes, earn rewards, and enjoy exclusive deals with every visit
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/cafes">
              <Button size="lg" className="btn-primary text-lg px-8">
                Explore Cafes
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/loyalty-card">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Join Rewards
              </Button>
            </Link>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer, index) => (
            <Card key={index} className="card-hover border-primary/20 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {offer.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{offer.title}</h3>
                      <p className="text-sm text-muted-foreground">{offer.subtitle}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs font-mono">
                    {offer.code}
                  </Badge>
                </div>
                
                <p className="text-foreground/80 mb-4">{offer.description}</p>
                
                <Button variant="ghost" size="sm" className="w-full justify-between group">
                  Use This Offer
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;