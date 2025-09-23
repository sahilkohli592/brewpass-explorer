import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for restaurants
const restaurants = [
  {
    id: 1,
    name: 'The Coffee Roastery',
    image: '/src/assets/cafe-interior.jpg',
    rating: 4.5,
    reviewCount: 1200,
    deliveryTime: '25-30 min',
    distance: '1.2 km',
    cuisine: ['Coffee', 'Beverages', 'Snacks'],
    discount: '20% OFF',
    isVeg: true,
    price: '₹200 for two',
  },
  {
    id: 2,
    name: 'Artisan Café',
    image: '/src/assets/cafe-outdoor.jpg',
    rating: 4.7,
    reviewCount: 850,
    deliveryTime: '20-25 min',
    distance: '0.8 km',
    cuisine: ['Italian', 'Continental', 'Desserts'],
    discount: 'Free Delivery',
    price: '₹400 for two',
  },
  {
    id: 3,
    name: 'Bean There Café',
    image: '/src/assets/menu-drinks.jpg',
    rating: 4.3,
    reviewCount: 950,
    deliveryTime: '30-35 min',
    distance: '2.1 km',
    cuisine: ['Coffee', 'Sandwiches', 'Pastries'],
    discount: '₹75 OFF',
    isVeg: true,
    price: '₹250 for two',
  },
  {
    id: 4,
    name: 'Brew & Bite',
    image: '/src/assets/menu-food.jpg',
    rating: 4.6,
    reviewCount: 1500,
    deliveryTime: '15-20 min',
    distance: '0.5 km',
    cuisine: ['Fast Food', 'Burgers', 'Beverages'],
    discount: '30% OFF',
    price: '₹300 for two',
  },
  {
    id: 5,
    name: 'Cozy Corner Café',
    image: '/src/assets/combo-deals.jpg',
    rating: 4.4,
    reviewCount: 750,
    deliveryTime: '25-30 min',
    distance: '1.5 km',
    cuisine: ['Healthy', 'Salads', 'Smoothies'],
    isVeg: true,
    price: '₹350 for two',
  },
  {
    id: 6,
    name: 'Urban Grind',
    image: '/src/assets/cafe-interior.jpg',
    rating: 4.8,
    reviewCount: 2000,
    deliveryTime: '20-25 min',
    distance: '1.0 km',
    cuisine: ['Premium Coffee', 'Gourmet', 'Desserts'],
    discount: '₹100 OFF',
    price: '₹500 for two',
  }
];

const PopularSection = () => {
  const [likedRestaurants, setLikedRestaurants] = useState<number[]>([]);

  const handleLike = (restaurantId: number) => {
    setLikedRestaurants(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  return (
    <section className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="popular" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="glass">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
              <TabsTrigger value="offers">Best Offers</TabsTrigger>
              <TabsTrigger value="fastest">Fastest Delivery</TabsTrigger>
            </TabsList>
            
            <button className="text-primary font-medium hover:underline">
              View all
            </button>
          </div>
          
          <TabsContent value="popular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  isLiked={likedRestaurants.includes(restaurant.id)}
                  onLike={() => handleLike(restaurant.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="nearby" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants
                .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                .map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    {...restaurant}
                    isLiked={likedRestaurants.includes(restaurant.id)}
                    onLike={() => handleLike(restaurant.id)}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="offers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants
                .filter(r => r.discount)
                .map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    {...restaurant}
                    isLiked={likedRestaurants.includes(restaurant.id)}
                    onLike={() => handleLike(restaurant.id)}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="fastest" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants
                .sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime))
                .map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    {...restaurant}
                    isLiked={likedRestaurants.includes(restaurant.id)}
                    onLike={() => handleLike(restaurant.id)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PopularSection;