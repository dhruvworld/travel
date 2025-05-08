'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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
        const res = await fetch('/api/testimonials');
        const data = await res.json();
        setTestimonials(data);
      } catch {
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">What Our Travelers Say</h2>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} className="p-6 border rounded-xl shadow-sm">
                <div className="text-yellow-400 flex">{Array.from({ length: t.stars }).map((_, j) => <Star key={j} fill="currentColor" />)}</div>
                <p className="text-gray-600 italic mt-3">"{t.feedback}"</p>
                <p className="font-semibold mt-4">{t.name}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
