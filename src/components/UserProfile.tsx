import React, { useState } from 'react';
import { User, Settings, Heart, Clock, CreditCard, Gift, Coffee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 98765 43210",
    favoriteOrder: "Cappuccino with extra shot",
    loyaltyPoints: 1250,
    totalVisits: 47,
    memberSince: "January 2023"
  });

  const recentActivity = [
    { type: "visit", cafe: "Blue Tokai Coffee", date: "2024-01-15", points: "+25" },
    { type: "order", cafe: "Third Wave Coffee", date: "2024-01-12", amount: "₹450" },
    { type: "review", cafe: "Starbucks", date: "2024-01-10", rating: 4 }
  ];

  const favorites = [
    { name: "Blue Tokai Coffee", location: "Khan Market" },
    { name: "Third Wave Coffee", location: "Indiranagar" },
    { name: "Roastery Coffee House", location: "Banjara Hills" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
    console.log('Saving profile:', profile);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <GlassmorphicCard>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">Member since {profile.memberSince}</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="favoriteOrder">Favorite Order</Label>
                  <Input
                    id="favoriteOrder"
                    value={profile.favoriteOrder}
                    onChange={(e) => setProfile(prev => ({ ...prev, favoriteOrder: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p>{profile.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  <p>{profile.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Favorite Order</Label>
                  <p>{profile.favoriteOrder}</p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Gift className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{profile.loyaltyPoints}</p>
                    <p className="text-sm text-muted-foreground">Loyalty Points</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Coffee className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{profile.totalVisits}</p>
                    <p className="text-sm text-muted-foreground">Total Visits</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </GlassmorphicCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <GlassmorphicCard>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{activity.cafe}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type === 'visit' && 'Visited'}
                      {activity.type === 'order' && 'Order placed'}
                      {activity.type === 'review' && 'Review submitted'}
                      {' • ' + activity.date}
                    </p>
                  </div>
                  <div>
                    {activity.type === 'visit' && (
                      <Badge variant="secondary">{activity.points}</Badge>
                    )}
                    {activity.type === 'order' && (
                      <Badge variant="outline">{activity.amount}</Badge>
                    )}
                    {activity.type === 'review' && (
                      <Badge variant="default">{activity.rating}★</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </GlassmorphicCard>

        {/* Favorite Cafes */}
        <GlassmorphicCard>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-primary" />
              Favorite Cafes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {favorites.map((cafe, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{cafe.name}</p>
                    <p className="text-sm text-muted-foreground">{cafe.location}</p>
                  </div>
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </GlassmorphicCard>
      </div>
    </div>
  );
};

export default UserProfile;