import React from 'react';
import { Star, Clock, MapPin, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import InteractiveCard from '@/components/ui/InteractiveCard';

interface RestaurantCardProps {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  distance: string;
  cuisine: string[];
  discount?: string;
  isVeg?: boolean;
  price: string;
  isLiked?: boolean;
  onLike?: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  image,
  rating,
  reviewCount,
  deliveryTime,
  distance,
  cuisine,
  discount,
  isVeg,
  price,
  isLiked = false,
  onLike,
}) => {
  return (
    <InteractiveCard className="menu-card overflow-hidden group cursor-pointer" tiltEffect={true}>
      <div className="relative">
        <div className="aspect-[16/10] overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {discount && (
            <Badge className="bg-primary text-white font-bold">
              {discount}
            </Badge>
          )}
          {isVeg && (
            <Badge className="bg-green-500 text-white">
              VEG
            </Badge>
          )}
        </div>
        
        {/* Heart icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike?.();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        
        {/* Quick add button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
            Quick Add
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {cuisine.join(', ')}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-sm">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-medium">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({reviewCount}+)</span>
          </div>
          
          <div className="text-right">
            <div className="font-bold text-foreground">{price}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{distance}</span>
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
};

export default RestaurantCard;