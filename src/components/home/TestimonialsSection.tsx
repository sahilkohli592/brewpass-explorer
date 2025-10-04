import React from 'react';
import { Star, Quote } from 'lucide-react';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Coffee Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    text: "Krown has completely changed how I discover cafés. The loyalty rewards are amazing and I've found so many hidden gems!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Regular User",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    text: "Best app for coffee lovers! The DineOut deals have saved me so much money, and booking tables is super convenient.",
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Café Hopper",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
    text: "Love the seamless experience! From discovering new cafés to earning rewards, everything is so well designed.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-foreground/70 text-lg">Join thousands of satisfied coffee lovers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <GlassmorphicCard
              key={testimonial.id}
              className="p-6"
              animation="slide-up"
              delay={index * 100}
            >
              <Quote className="w-8 h-8 text-primary/40 mb-4" />
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </GlassmorphicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
