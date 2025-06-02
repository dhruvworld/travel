'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Testimonial {
  id: string;
  content: string;
  author: string;
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        toast.error('Failed to load testimonials.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete testimonial');
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success('Testimonial deleted successfully.');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial.');
    }
  };

  if (isLoading) {
    return <div>Loading testimonials...</div>;
  }

  return (
    <div>
      <h1>Manage Testimonials</h1>
      <ul>
        {testimonials.map((testimonial) => (
          <li key={testimonial.id}>
            <p>{testimonial.content}</p>
            <p>- {testimonial.author}</p>
            <button onClick={() => handleDelete(testimonial.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
