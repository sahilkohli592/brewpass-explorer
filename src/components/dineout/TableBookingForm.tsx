import React from 'react';
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TableBookingFormProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  partySize: string;
  setPartySize: (size: string) => void;
  restaurant: any;
  onConfirm: () => void;
  getTimeUntilSlot: (slot: string) => string;
}

const TableBookingForm: React.FC<TableBookingFormProps> = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  partySize,
  setPartySize,
  restaurant,
  onConfirm,
  getTimeUntilSlot
}) => {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Quick Info */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Instant confirmation • Free cancellation up to 2 hours before • No booking fees
        </AlertDescription>
      </Alert>

      {/* Date Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Select Date
        </label>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={today}
          max={maxDateStr}
          className="w-full"
        />
      </div>

      {/* Time Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Select Time
        </label>
        <div className="grid grid-cols-2 gap-3">
          {restaurant.timeSlots.map((slot) => {
            const timeUntil = getTimeUntilSlot(slot);
            const isPast = timeUntil === "Past";
            const isSelected = selectedTime === slot;
            
            return (
              <Button
                key={slot}
                variant={isSelected ? "default" : "outline"}
                onClick={() => !isPast && setSelectedTime(slot)}
                disabled={isPast}
                className={`relative text-sm py-3 ${isPast ? 'opacity-50' : ''}`}
              >
                <div className="flex flex-col">
                  <span>{slot}</span>
                  <span className="text-xs opacity-75">
                    {isPast ? 'Past' : timeUntil === 'Now' ? 'Available now' : `In ${timeUntil}`}
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Party Size */}
      <div className="space-y-3">
        <label className="block text-sm font-medium flex items-center gap-2">
          <Users className="w-4 h-4" />
          Party Size
        </label>
        <Select value={partySize} onValueChange={setPartySize}>
          <SelectTrigger>
            <SelectValue placeholder="Number of people" />
          </SelectTrigger>
          <SelectContent>
            {[1,2,3,4,5,6,7,8].map(num => (
              <SelectItem key={num} value={num.toString()}>
                <div className="flex items-center justify-between w-full">
                  <span>{num} {num === 1 ? 'Person' : 'People'}</span>
                  {num <= 4 && <Badge variant="secondary" className="ml-2 text-xs">Popular</Badge>}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Guest Details */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Guest Details</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Primary guest name" />
          <Input placeholder="Phone number" type="tel" />
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Special Requests (Optional)</label>
        <Textarea 
          placeholder="Anniversary celebration, dietary restrictions, seating preferences..." 
          className="min-h-[80px]"
        />
      </div>

      {/* Pricing Summary */}
      <div className="p-4 bg-muted/30 rounded-lg space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Original Price:</span>
          <span className="text-sm line-through text-muted-foreground">₹{restaurant.originalPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">DineOut Price:</span>
          <span className="text-sm font-medium text-green-600">₹{restaurant.dineoutPrice}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="font-medium">You Save:</span>
          <span className="font-medium text-green-600">₹{restaurant.originalPrice - restaurant.dineoutPrice}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <Button 
        onClick={onConfirm} 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
        size="lg"
        disabled={!selectedDate || !selectedTime || !partySize}
      >
        Confirm Booking
      </Button>
    </div>
  );
};

export default TableBookingForm;