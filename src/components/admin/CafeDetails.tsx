import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Store, MapPin, Clock, Phone, Mail, CreditCard, Save, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CafeInfo {
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  email: string;
  upiId: string;
  openingTime: string;
  closingTime: string;
  description: string;
  specialties: string[];
  status: 'active' | 'inactive';
}

const CafeDetails = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [cafeInfo, setCafeInfo] = useState<CafeInfo>({
    name: "Coffee Haven",
    address: "123 Bean Street, Coffee District",
    city: "Mumbai",
    pincode: "400001",
    phone: "+91 98765 43210",
    email: "admin@coffeehaven.com",
    upiId: "coffeehaven@paytm",
    openingTime: "07:00",
    closingTime: "22:00",
    description: "A cozy neighborhood cafe serving the finest coffee and pastries since 2020.",
    specialties: ["Specialty Coffee", "Fresh Pastries", "Free WiFi"],
    status: 'active',
  });

  const handleSave = () => {
    // In a real app, this would save to the database
    setIsEditing(false);
    toast({
      title: "Cafe Details Updated",
      description: "Your cafe information has been successfully updated.",
    });
  };

  const handleInputChange = (field: keyof CafeInfo, value: string) => {
    setCafeInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialtiesChange = (value: string) => {
    const specialties = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    setCafeInfo(prev => ({ ...prev, specialties }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Cafe Details
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={cafeInfo.status === 'active' ? 'default' : 'secondary'}>
              {cafeInfo.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Basic Information</h3>
              
              <div>
                <Label htmlFor="cafeName">Cafe Name</Label>
                <Input
                  id="cafeName"
                  value={cafeInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="cafeDescription">Description</Label>
                <Textarea
                  id="cafeDescription"
                  value={cafeInfo.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="specialties">Specialties (comma separated)</Label>
                <Input
                  id="specialties"
                  value={cafeInfo.specialties.join(', ')}
                  onChange={(e) => handleSpecialtiesChange(e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., Specialty Coffee, Fresh Pastries"
                />
              </div>
            </div>

            {/* Location & Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location & Contact
              </h3>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={cafeInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={cafeInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={cafeInfo.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={cafeInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={cafeInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Operating Hours & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Operating Hours
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="openingTime">Opening Time</Label>
                  <Input
                    id="openingTime"
                    type="time"
                    value={cafeInfo.openingTime}
                    onChange={(e) => handleInputChange('openingTime', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="closingTime">Closing Time</Label>
                  <Input
                    id="closingTime"
                    type="time"
                    value={cafeInfo.closingTime}
                    onChange={(e) => handleInputChange('closingTime', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </h3>

              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  value={cafeInfo.upiId}
                  onChange={(e) => handleInputChange('upiId', e.target.value)}
                  disabled={!isEditing}
                  placeholder="yourstore@paytm"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CafeDetails;