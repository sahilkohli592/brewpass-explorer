import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { UtensilsCrossed, Plus, Trash2, Calendar, Percent, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DineOutOffer {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  validFrom: string;
  validUntil: string;
  maxRedemptions: number;
  currentRedemptions: number;
  termsConditions: string;
  isActive: boolean;
  offerType: 'percentage' | 'flat' | 'bogo';
}

const DineOutPromotion = () => {
  const { toast } = useToast();
  const [offers, setOffers] = useState<DineOutOffer[]>([
    {
      id: '1',
      title: '20% Off Dine-In',
      description: 'Get 20% off on your total bill when you dine in',
      discountPercent: 20,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      maxRedemptions: 100,
      currentRedemptions: 25,
      termsConditions: 'Valid only for dine-in. Cannot be combined with other offers.',
      isActive: true,
      offerType: 'percentage',
    },
  ]);

  const [newOffer, setNewOffer] = useState<Omit<DineOutOffer, 'id' | 'currentRedemptions'>>({
    title: '',
    description: '',
    discountPercent: 0,
    validFrom: '',
    validUntil: '',
    maxRedemptions: 50,
    termsConditions: '',
    isActive: true,
    offerType: 'percentage',
  });

  const handleAddOffer = () => {
    if (!newOffer.title || !newOffer.description || !newOffer.validFrom || !newOffer.validUntil) {
      toast({
        title: "Invalid Input",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const offer: DineOutOffer = {
      ...newOffer,
      id: Date.now().toString(),
      currentRedemptions: 0,
    };

    setOffers([...offers, offer]);
    setNewOffer({
      title: '',
      description: '',
      discountPercent: 0,
      validFrom: '',
      validUntil: '',
      maxRedemptions: 50,
      termsConditions: '',
      isActive: true,
      offerType: 'percentage',
    });

    toast({
      title: "Dine-Out Offer Created",
      description: `${offer.title} has been added successfully.`,
    });
  };

  const handleDeleteOffer = (id: string) => {
    const offer = offers.find(o => o.id === id);
    setOffers(offers.filter(o => o.id !== id));
    
    toast({
      title: "Offer Deleted",
      description: `${offer?.title} has been removed.`,
    });
  };

  const toggleOfferStatus = (id: string) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
    ));
  };

  const getOfferTypeLabel = (type: string) => {
    switch (type) {
      case 'percentage': return 'Percentage Off';
      case 'flat': return 'Flat Discount';
      case 'bogo': return 'Buy One Get One';
      default: return 'Percentage Off';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5" />
            Dine-Out Promotions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Create New Offer */}
          <div className="border-2 border-dashed border-muted rounded-lg p-4">
            <h3 className="font-semibold mb-4">Create New Dine-Out Offer</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="offerTitle">Offer Title</Label>
                  <Input
                    id="offerTitle"
                    value={newOffer.title}
                    onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                    placeholder="e.g., 20% Off Dine-In"
                  />
                </div>
                <div>
                  <Label htmlFor="offerType">Offer Type</Label>
                  <select
                    id="offerType"
                    className="w-full p-2 border rounded-md"
                    value={newOffer.offerType}
                    onChange={(e) => setNewOffer({ ...newOffer, offerType: e.target.value as any })}
                  >
                    <option value="percentage">Percentage Off</option>
                    <option value="flat">Flat Discount</option>
                    <option value="bogo">Buy One Get One</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="offerDescription">Description</Label>
                <Textarea
                  id="offerDescription"
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                  placeholder="Describe your offer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="discountPercent">Discount %</Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    value={newOffer.discountPercent || ''}
                    onChange={(e) => setNewOffer({ ...newOffer, discountPercent: Number(e.target.value) })}
                    placeholder="20"
                  />
                </div>
                <div>
                  <Label htmlFor="validFrom">Valid From</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={newOffer.validFrom}
                    onChange={(e) => setNewOffer({ ...newOffer, validFrom: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={newOffer.validUntil}
                    onChange={(e) => setNewOffer({ ...newOffer, validUntil: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="maxRedemptions">Max Redemptions</Label>
                <Input
                  id="maxRedemptions"
                  type="number"
                  value={newOffer.maxRedemptions}
                  onChange={(e) => setNewOffer({ ...newOffer, maxRedemptions: Number(e.target.value) })}
                  placeholder="50"
                />
              </div>

              <div>
                <Label htmlFor="termsConditions">Terms & Conditions</Label>
                <Textarea
                  id="termsConditions"
                  value={newOffer.termsConditions}
                  onChange={(e) => setNewOffer({ ...newOffer, termsConditions: e.target.value })}
                  placeholder="Add terms and conditions for the offer"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={newOffer.isActive}
                  onCheckedChange={(checked) => setNewOffer({ ...newOffer, isActive: checked })}
                />
                <Label>Active immediately</Label>
              </div>
            </div>

            <Button onClick={handleAddOffer} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create Offer
            </Button>
          </div>

          {/* Active Offers */}
          <div>
            <h3 className="font-semibold mb-4">Active Dine-Out Offers ({offers.length})</h3>
            {offers.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No dine-out offers created yet.</p>
            ) : (
              <div className="space-y-4">
                {offers.map((offer) => (
                  <Card key={offer.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{offer.title}</h4>
                            <Badge variant={offer.isActive ? 'default' : 'secondary'}>
                              {offer.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                            <Badge variant="outline">
                              {getOfferTypeLabel(offer.offerType)}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Percent className="h-4 w-4" />
                              <span>{offer.discountPercent}% Discount</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{offer.validFrom} to {offer.validUntil}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{offer.currentRedemptions}/{offer.maxRedemptions} used</span>
                            </div>
                          </div>

                          {offer.termsConditions && (
                            <div className="mt-3 p-2 bg-muted rounded text-xs">
                              <strong>Terms:</strong> {offer.termsConditions}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleOfferStatus(offer.id)}
                          >
                            {offer.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteOffer(offer.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DineOutPromotion;