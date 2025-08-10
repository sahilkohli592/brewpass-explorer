import React from 'react';
import { Star, Heart, Share2, Clock, MapPin, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MenuCardProps {
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  cuisine: string;
  price?: string;
  discount?: number;
  offer?: string;
  isOpen?: boolean;
  className?: string;
  onLike?: () => void;
  onShare?: () => void;
  isLiked?: boolean;
  children?: React.ReactNode;
}

const MenuCard: React.FC<MenuCardProps> = ({
  title,
  image,
  rating,
  reviewCount,
  location,
  cuisine,
  price,
  discount,
  offer,
  isOpen = true,
  className,
  onLike,
  onShare,
  isLiked = false,
  children
}) => {
  return (
    <div className={cn("menu-card group overflow-hidden relative", className)}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount && (
            <Badge className="bg-accent text-white font-semibold shadow-lg">
              {discount}% OFF
            </Badge>
          )}
          {offer && (
            <Badge className="bg-primary text-white font-semibold shadow-lg text-xs">
              <Gift className="w-3 h-3 mr-1" />
              {offer}
            </Badge>
          )}
        </div>
        
        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div className="flex gap-2">
            {onLike && (
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike();
                }}
              >
                <Heart 
                  className={cn(
                    "w-4 h-4",
                    isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                  )} 
                />
              </Button>
            )}
            {onShare && (
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
              >
                <Share2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            )}
          </div>
          
          {/* Rating Badge */}
          <Badge variant="outline" className="bg-white/95 text-primary border-primary/20">
            <Star className="w-3 h-3 mr-1 fill-current text-amber-500" />
            {rating}
          </Badge>
        </div>
        
        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge 
            variant={isOpen ? "default" : "secondary"} 
            className={cn(
              "text-xs",
              isOpen 
                ? "bg-green-500 text-white" 
                : "bg-gray-500 text-white"
            )}
          >
            <Clock className="h-3 w-3 mr-1" />
            {isOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-foreground/70 font-medium">{cuisine}</span>
            {price && (
              <span className="text-primary font-semibold">{price}</span>
            )}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(rating) 
                      ? "fill-amber-400 text-amber-400" 
                      : "text-gray-300"
                  )}
                />
              ))}
              <span className="ml-2">{rating}</span>
            </div>
            <span className="ml-auto">({reviewCount} reviews)</span>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default MenuCard;