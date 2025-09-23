import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';

const offers = [
  {
    id: 1,
    title: '50% OFF',
    subtitle: 'Up to ₹100',
    description: 'Use code WELCOME50',
    color: 'from-red-500 to-pink-600',
    textColor: 'text-white'
  },
  {
    id: 2,
    title: 'Free Delivery',
    subtitle: 'On orders above ₹299',
    description: 'No delivery charges',
    color: 'from-green-500 to-emerald-600',
    textColor: 'text-white'
  },
  {
    id: 3,
    title: '₹75 OFF',
    subtitle: 'On first order',
    description: 'Use code FIRST75',
    color: 'from-blue-500 to-indigo-600',
    textColor: 'text-white'
  },
  {
    id: 4,
    title: 'Buy 1 Get 1',
    subtitle: 'On beverages',
    description: 'Limited time offer',
    color: 'from-purple-500 to-violet-600',
    textColor: 'text-white'
  },
];

const OffersCarousel = () => {
  return (
    <section className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Deals for you</h2>
          <button className="text-primary font-medium hover:underline">
            View all offers
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {offers.map((offer) => (
              <CarouselItem key={offer.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <GlassmorphicCard className="h-full cursor-pointer hover:shadow-xl transition-shadow">
                  <div className={`bg-gradient-to-br ${offer.color} p-6 h-32 flex flex-col justify-between relative overflow-hidden`}>
                    <div className="relative z-10">
                      <div className={`${offer.textColor} space-y-1`}>
                        <h3 className="text-xl font-bold">{offer.title}</h3>
                        <p className="text-sm opacity-90">{offer.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {offer.description}
                      </Badge>
                    </div>
                    
                    {/* Background decoration */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full" />
                  </div>
                </GlassmorphicCard>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default OffersCarousel;