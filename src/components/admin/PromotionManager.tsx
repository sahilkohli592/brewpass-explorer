
import React, { useState } from 'react';
import { Percent, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

type Promotion = {
  id: string;
  title: string;
  description: string;
  discountPercent?: number;
};

const PromotionManager = () => {
  // Mock data - in a real app, this would be fetched from an API
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      title: 'Happy Hour',
      description: '20% off all coffees between 2 PM and 4 PM daily',
      discountPercent: 20,
    },
    {
      id: '2',
      title: 'Loyalty Bonus',
      description: 'Free pastry with any coffee purchase for BrewPass members',
    },
  ]);

  const [newPromotion, setNewPromotion] = useState<Omit<Promotion, 'id'>>({
    title: '',
    description: '',
    discountPercent: undefined,
  });

  const handleAddPromotion = () => {
    if (!newPromotion.title || !newPromotion.description) {
      toast({
        title: "Missing Information",
        description: "Please provide both a title and description for the promotion.",
        variant: "destructive",
      });
      return;
    }

    const id = Date.now().toString();
    setPromotions([...promotions, { ...newPromotion, id }]);
    
    toast({
      title: "Promotion Added",
      description: "Your new café promotion has been added successfully.",
    });
    
    // Reset form
    setNewPromotion({
      title: '',
      description: '',
      discountPercent: undefined,
    });
  };

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter(promo => promo.id !== id));
    toast({
      title: "Promotion Removed",
      description: "The promotion has been removed successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Percent className="mr-2 h-5 w-5 text-primary" />
          Café Promotions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="promo-title">Promotion Title</Label>
              <Input
                id="promo-title"
                value={newPromotion.title}
                onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                placeholder="e.g., Happy Hour, Weekend Special"
              />
            </div>
            <div>
              <Label htmlFor="promo-description">Description</Label>
              <Textarea
                id="promo-description"
                value={newPromotion.description}
                onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                placeholder="Describe your promotion..."
                className="resize-none"
              />
            </div>
            <div>
              <Label htmlFor="promo-discount">Discount Percentage (Optional)</Label>
              <Input
                id="promo-discount"
                type="number"
                min={0}
                max={100}
                value={newPromotion.discountPercent || ''}
                onChange={(e) => setNewPromotion({
                  ...newPromotion,
                  discountPercent: e.target.value ? Number(e.target.value) : undefined
                })}
                placeholder="e.g., 15 for 15% off"
              />
            </div>
            <Button onClick={handleAddPromotion} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Promotion
            </Button>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Current Promotions</h4>
            {promotions.length > 0 ? (
              <div className="space-y-3">
                {promotions.map(promo => (
                  <div key={promo.id} className="flex justify-between items-start p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">
                        {promo.title}
                        {promo.discountPercent && <span className="ml-2 text-primary">{promo.discountPercent}% off</span>}
                      </h4>
                      <p className="text-sm text-muted-foreground">{promo.description}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeletePromotion(promo.id)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete promotion</span>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No promotions added yet.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionManager;
