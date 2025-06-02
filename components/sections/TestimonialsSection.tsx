'use client';

<<<<<<< HEAD
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      country: "India",
      feedback: "Shubham Travel planned everything perfectly for our honeymoon! The attention to detail was amazing and every aspect of our trip exceeded expectations.",
      stars: 5,
      image: "/images/person1.jpg" // Updated path
    },
    {
      name: "John Carter",
      country: "USA",
      feedback: "Incredible experience through the Golden Triangle. The guides were knowledgeable, accommodations excellent, and the entire journey was seamless. Highly recommend!",
      stars: 5,
      image: "/images/person2.jpg" // Updated path
    },
    {
      name: "Emily Chen",
      country: "Canada",
      feedback: "Flawless execution and friendly guides. I felt safe and well-taken care of throughout my journey across India. Will definitely book again!",
      stars: 5,
      image: "/images/person3.jpg" // Updated path
    }
  ];

  return (
    <section className="py-16 sm:py-24 px-6 bg-white" id="testimonials">
      <div className="max-w-6xl mx-auto">
=======
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

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to demo data if fetch fails
        setTestimonials([
          {
            id: '1',
            name: 'Priya Sharma',
            country: 'India',
            feedback: 'Amazing experience!',
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
            feedback: "Our Kerala tour was magical. Beautiful backwaters and excellent service from the team.",
            stars: 4,
            image: "/images/person3.jpg"
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

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

  if (testimonials.length === 0 && !loading) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
<<<<<<< HEAD
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from travelers who have explored with us
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-shadow"
            >
              <div className="flex text-amber-400 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.feedback}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.country}</p>
                </div>
                {/* Using placeholder avatar with error handling */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  {/* Using Image component with fallback */}
                  <Image 
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder on error
                      (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(testimonial.name);
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
=======
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

        {loading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
          </div>
        ) : (
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
        )}
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
      </div>
    </section>
  );
}
