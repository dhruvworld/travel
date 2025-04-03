'use client';

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
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
      </div>
    </section>
  );
}
