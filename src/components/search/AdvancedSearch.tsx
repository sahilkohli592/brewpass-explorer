import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Clock, Star, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGeolocation } from '@/hooks/useGeolocation';

interface SearchFilters {
  query: string;
  rating: number;
  distance: number;
  isOpen: boolean;
  hasOffers: boolean;
  priceRange: [number, number];
  cuisine: string;
  sortBy: string;
  useLocation: boolean;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
  className?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ 
  onSearch, 
  onClear, 
  className 
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    rating: 0,
    distance: 5,
    isOpen: false,
    hasOffers: false,
    priceRange: [0, 100],
    cuisine: 'all',
    sortBy: 'distance',
    useLocation: false,
  });

  const [showFilters, setShowFilters] = useState(false);
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation({
    watch: false,
  });

  const cuisineOptions = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'coffee', label: 'Coffee & Pastries' },
    { value: 'specialty', label: 'Specialty Coffee' },
    { value: 'international', label: 'International Coffee' },
    { value: 'artisan', label: 'Artisan Coffee' },
    { value: 'indian', label: 'Indian Coffee' },
    { value: 'traditional', label: 'Traditional Indian' },
  ];

  const sortOptions = [
    { value: 'distance', label: 'Distance' },
    { value: 'rating', label: 'Rating' },
    { value: 'name', label: 'Name' },
    { value: 'newest', label: 'Newest' },
    { value: 'offers', label: 'Best Offers' },
  ];

  useEffect(() => {
    if (filters.useLocation && latitude && longitude) {
      onSearch(filters);
    }
  }, [latitude, longitude, filters.useLocation]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    const clearedFilters: SearchFilters = {
      query: '',
      rating: 0,
      distance: 5,
      isOpen: false,
      hasOffers: false,
      priceRange: [0, 100],
      cuisine: 'all',
      sortBy: 'distance',
      useLocation: false,
    };
    setFilters(clearedFilters);
    onClear();
    setShowFilters(false);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.rating > 0) count++;
    if (filters.isOpen) count++;
    if (filters.hasOffers) count++;
    if (filters.cuisine !== 'all') count++;
    if (filters.useLocation) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={className}>
      {/* Main Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search cafés, locations, specialties..."
          className="pl-10 pr-20 py-6 rounded-full shadow-sm text-lg"
          value={filters.query}
          onChange={(e) => handleFilterChange('query', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
              >
                <Filter className="h-4 w-4" />
                {activeFilterCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
                    variant="destructive"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Search Filters</CardTitle>
                    {activeFilterCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={handleClear}>
                        <X className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Rating Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Minimum Rating</Label>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <Slider
                        value={[filters.rating]}
                        onValueChange={(value) => handleFilterChange('rating', value[0])}
                        max={5}
                        min={0}
                        step={0.5}
                        className="flex-1"
                      />
                      <span className="text-sm w-8 text-center">
                        {filters.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Location & Distance */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="use-location">Use My Location</Label>
                      <Switch
                        id="use-location"
                        checked={filters.useLocation}
                        onCheckedChange={(checked) => handleFilterChange('useLocation', checked)}
                        disabled={locationLoading}
                      />
                    </div>
                    
                    {filters.useLocation && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Distance (km)
                        </Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs w-6">0</span>
                          <Slider
                            value={[filters.distance]}
                            onValueChange={(value) => handleFilterChange('distance', value[0])}
                            max={25}
                            min={1}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-xs w-6">{filters.distance}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Quick Filters */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Quick Filters</Label>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="is-open" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Open Now
                      </Label>
                      <Switch
                        id="is-open"
                        checked={filters.isOpen}
                        onCheckedChange={(checked) => handleFilterChange('isOpen', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="has-offers" className="flex items-center gap-2">
                        <Badge className="h-4 w-4 rounded-full p-0">%</Badge>
                        Has Offers
                      </Label>
                      <Switch
                        id="has-offers"
                        checked={filters.hasOffers}
                        onCheckedChange={(checked) => handleFilterChange('hasOffers', checked)}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Cuisine Type */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Cuisine Type</Label>
                    <Select
                      value={filters.cuisine}
                      onValueChange={(value) => handleFilterChange('cuisine', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cuisineOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Sort By</Label>
                    <Select
                      value={filters.sortBy}
                      onValueChange={(value) => handleFilterChange('sortBy', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
          
          <Button onClick={handleSearch} className="rounded-full">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.rating > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {filters.rating}+ stars
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('rating', 0)}
              />
            </Badge>
          )}
          
          {filters.isOpen && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Open now
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('isOpen', false)}
              />
            </Badge>
          )}
          
          {filters.hasOffers && (
            <Badge variant="secondary" className="flex items-center gap-1">
              % Has offers
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('hasOffers', false)}
              />
            </Badge>
          )}
          
          {filters.cuisine !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {cuisineOptions.find(c => c.value === filters.cuisine)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('cuisine', 'all')}
              />
            </Badge>
          )}
          
          {filters.useLocation && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {filters.distance}km radius
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange('useLocation', false)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;