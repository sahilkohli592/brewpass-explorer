import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  isVeg?: boolean;
  isPopular?: boolean;
  preparationTime?: string;
}

interface PreOrderMenuProps {
  restaurant: any;
  preOrderItems: MenuItem[];
  setPreOrderItems: (items: MenuItem[]) => void;
  onAddItem: (item: MenuItem) => void;
}

const PreOrderMenu: React.FC<PreOrderMenuProps> = ({
  restaurant,
  preOrderItems,
  setPreOrderItems,
  onAddItem
}) => {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const menuItems: MenuItem[] = [
    { id: 1, name: "Espresso", price: 150, category: "Beverages", description: "Rich and bold espresso shot", isVeg: true, preparationTime: "3 mins" },
    { id: 2, name: "Cappuccino", price: 200, category: "Beverages", description: "Classic cappuccino with steamed milk", isVeg: true, isPopular: true, preparationTime: "5 mins" },
    { id: 3, name: "Avocado Toast", price: 350, category: "Food", description: "Fresh avocado on sourdough bread", isVeg: true, isPopular: true, preparationTime: "8 mins" },
    { id: 4, name: "Chicken Sandwich", price: 450, category: "Food", description: "Grilled chicken with fresh vegetables", isVeg: false, preparationTime: "12 mins" },
    { id: 5, name: "Tiramisu", price: 250, category: "Desserts", description: "Classic Italian dessert", isVeg: true, preparationTime: "2 mins" },
    { id: 6, name: "Caesar Salad", price: 320, category: "Food", description: "Fresh romaine lettuce with caesar dressing", isVeg: true, preparationTime: "6 mins" },
    { id: 7, name: "Iced Latte", price: 220, category: "Beverages", description: "Cold coffee with milk", isVeg: true, preparationTime: "4 mins" },
    { id: 8, name: "Chocolate Brownie", price: 180, category: "Desserts", description: "Warm chocolate brownie with ice cream", isVeg: true, preparationTime: "3 mins" }
  ];

  const categories = [...new Set(menuItems.map(item => item.category))];

  const updateQuantity = (itemId: number, change: number) => {
    const currentQty = quantities[itemId] || 0;
    const newQty = Math.max(0, currentQty + change);
    
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQty
    }));

    if (change > 0) {
      const item = menuItems.find(i => i.id === itemId);
      if (item) {
        onAddItem(item);
      }
    }
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalAmount = () => {
    return Object.entries(quantities).reduce((total, [itemId, qty]) => {
      const item = menuItems.find(i => i.id === parseInt(itemId));
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Pre-Order Menu
        </h3>
        {getTotalItems() > 0 && (
          <Badge className="bg-primary text-primary-foreground">
            {getTotalItems()} items • ₹{getTotalAmount()}
          </Badge>
        )}
      </div>
      
      <p className="text-muted-foreground">
        Save time by pre-ordering your favorites. Your order will be ready when you arrive!
      </p>

      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="text-sm">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="space-y-3 mt-6">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {menuItems
                .filter(item => item.category === category)
                .map((item) => {
                  const quantity = quantities[item.id] || 0;
                  
                  return (
                    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{item.name}</h4>
                              {item.isVeg && (
                                <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                                </div>
                              )}
                              {!item.isVeg && (
                                <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                                </div>
                              )}
                              {item.isPopular && (
                                <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            
                            {item.description && (
                              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            )}
                            
                            <div className="flex items-center gap-3">
                              <p className="font-semibold text-primary">₹{item.price}</p>
                              {item.preparationTime && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {item.preparationTime}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {quantity === 0 ? (
                              <Button 
                                size="sm" 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                              >
                                Add
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">{quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {getTotalItems() > 0 && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Pre-Order Summary
            </h4>
            <div className="space-y-2">
              {Object.entries(quantities)
                .filter(([_, qty]) => qty > 0)
                .map(([itemId, qty]) => {
                  const item = menuItems.find(i => i.id === parseInt(itemId));
                  if (!item) return null;
                  
                  return (
                    <div key={itemId} className="flex justify-between text-sm">
                      <span>{item.name} x{qty}</span>
                      <span>₹{item.price * qty}</span>
                    </div>
                  );
                })}
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Total Pre-Order:</span>
                <span className="text-primary">₹{getTotalAmount()}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Pre-order total will be added to your final bill
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PreOrderMenu;