'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  country?: string;
  feedback: string;
  stars: number;
  image?: string;
}

// Static testimonials data
const staticTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    country: 'India',
    feedback: 'Amazing experience with Shubham Tours! The Ladakh trip was perfectly organized. Our guide was knowledgeable and the accommodations were excellent. Highly recommend!',
    stars: 5,
    image: '/images/person1.jpg',
  },
  {
    id: '2',
    name: "John Carter",
    country: "USA",
    feedback: "Incredible experience through the Golden Triangle. The guides were knowledgeable, accommodations excellent, and the entire journey was seamless. Would highly recommend!",
    stars: 5,
    image: "/images/person2.jpg"
  },
  {
    id: '3',
    name: "Emily Chen",
    country: "Canada",
    feedback: "Our Kerala tour was magical. Beautiful backwaters and excellent service from the team. Shubham Tours made our honeymoon unforgettable!",
    stars: 5,
    image: "/images/person3.jpg"
  },
  {
    id: '4',
    name: "Rajesh Patel",
    country: "Gujarat",
    feedback: "Best travel agency in Ahmedabad! Booked our Manali trip and everything was perfect. Professional service and great value for money.",
    stars: 5,
    image: "/images/person1.jpg"
  },
  {
    id: '5',
    name: "Sarah Johnson",
    country: "UK",
    feedback: "Amazing Rajasthan tour with Shubham Tours. The desert safari and palace visits were incredible. Our driver was very professional.",
    stars: 4,
    image: "/images/person2.jpg"
  },
  {
    id: '6',
    name: "Amit Kumar",
    country: "Delhi",
    feedback: "Excellent car rental service in Ahmedabad. Clean vehicles and professional drivers. Will definitely use Shubham Tours again!",
    stars: 5,
    image: "/images/person3.jpg"
  }
];

export default function TestimonialsSection() {
  const [testimonials] = useState<Testimonial[]>(staticTestimonials);

  // Stars rendering helper
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        fill={index < count ? 'currentColor' : 'none'} 
        className={index < count ? 'text-yellow-400' : 'text-gray-300'} 
      />
    ));
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read about the experiences of customers who have explored the world with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex mb-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-indigo-100 w-full h-full flex items-center justify-center">
                      <span className="text-indigo-700 font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  {testimonial.country && (
                    <p className="text-sm text-gray-500">{testimonial.country}</p>
                  )}
                </div>
              </div>
              
              <div className="flex text-yellow-400 mb-2">
                {renderStars(testimonial.stars)}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
