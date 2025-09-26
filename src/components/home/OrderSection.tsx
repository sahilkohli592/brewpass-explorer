import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee, Utensils, ShoppingBag, Clock } from 'lucide-react';

const OrderSection = () => {
  const orderOptions = [
    {
      title: "Browse Menu",
      description: "Explore our full menu with detailed descriptions",
      icon: <Utensils className="w-6 h-6" />,
      link: "/menu",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      title: "Quick Order",
      description: "Reorder your favorite items instantly",
      icon: <Coffee className="w-6 h-6" />,
      link: "/quick-order",
      color: "bg-green-500/10 text-green-600"
    },
    {
      title: "Partner Cafes",
      description: "Order from our network of partner cafes",
      icon: <ShoppingBag className="w-6 h-6" />,
      link: "/cafes",
      color: "bg-purple-500/10 text-purple-600"
    }
  ];

  const popularItems = [
    { name: "Cappuccino", price: "₹180", time: "5-10 min" },
    { name: "Americano", price: "₹150", time: "3-5 min" },
    { name: "Cold Brew", price: "₹220", time: "2-3 min" },
    { name: "Latte", price: "₹200", time: "5-8 min" }
  ];

  return (
    <div className="py-12 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Order Now</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose how you want to order - browse our complete menu or quickly reorder your favorites
          </p>
        </div>

        {/* Order Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {orderOptions.map((option, index) => (
            <Card key={index} className="card-hover text-center group cursor-pointer">
              <CardContent className="p-8">
                <div className={`inline-flex p-4 rounded-2xl mb-6 ${option.color}`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                <p className="text-muted-foreground mb-6">{option.description}</p>
                <Link to={option.link}>
                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Items */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Popular Right Now</h3>
            <Link to="/menu">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularItems.map((item, index) => (
              <div key={index} className="text-center p-4 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Coffee className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-medium mb-1">{item.name}</h4>
                <p className="text-sm text-primary font-semibold mb-1">{item.price}</p>
                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderSection;