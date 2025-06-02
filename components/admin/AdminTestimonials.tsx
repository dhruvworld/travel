'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Testimonial {
  id: string;
  name: string;
  country?: string;
  feedback: string;
  stars: number;
  image?: string;
  active: boolean;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    country: '',
    feedback: '',
    stars: 5,
    image: ''
  });

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/testimonials');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        toast.error('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial({
      ...newTestimonial,
      [name]: name === 'stars' ? Math.min(5, Math.max(1, parseInt(value))) : value
    });
  };

  const handleAddTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.feedback) {
      toast.error('Name and feedback are required');
      return;
    }

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTestimonial)
      });

      if (!response.ok) {
        throw new Error('Failed to add testimonial');
      }

      const addedTestimonial = await response.json();
      setTestimonials([addedTestimonial, ...testimonials]);
      setNewTestimonial({
        name: '',
        country: '',
        feedback: '',
        stars: 5,
        image: ''
      });
      toast.success('Testimonial added successfully');
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast.error('Failed to add testimonial');
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          active: !currentActive
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update testimonial');
      }

      const updatedTestimonial = await response.json();
      setTestimonials(testimonials.map(t => 
        t.id === id ? updatedTestimonial : t
      ));
      toast.success(`Testimonial ${!currentActive ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast.error('Failed to update testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error('Failed to delete testimonial');
      }

      setTestimonials(testimonials.filter(t => t.id !== id));
      toast.success('Testimonial deleted successfully');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

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

  return (
    <section className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Manage Testimonials</h2>

      {/* Add new testimonial form */}
      <div className="border p-4 rounded-lg shadow bg-white">
        <h3 className="font-semibold mb-4">Add New Testimonial</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={newTestimonial.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={newTestimonial.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g. India"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback *</label>
            <textarea
              name="feedback"
              value={newTestimonial.feedback}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border rounded"
              placeholder="Customer feedback"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5 stars)</label>
              <input
                type="number"
                name="stars"
                min="1"
                max="5"
                value={newTestimonial.stars}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex mt-2">
                {renderStars(newTestimonial.stars)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={newTestimonial.image}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <button
            onClick={handleAddTestimonial}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Testimonial
          </button>
        </div>
      </div>

      {/* List of testimonials */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading testimonials...</div>
      ) : (
        <div className="space-y-4">
          {testimonials.length > 0 ? (
            testimonials.map(testimonial => (
              <div 
                key={testimonial.id} 
                className={`border p-4 rounded-lg shadow bg-white ${
                  !testimonial.active ? 'opacity-70' : ''
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex items-start">
                    {testimonial.image && (
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      {testimonial.country && <p className="text-sm text-gray-500">{testimonial.country}</p>}
                      <div className="flex mt-1">
                        {renderStars(testimonial.stars)}
                      </div>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleToggleActive(testimonial.id, testimonial.active)}
                      className={`px-3 py-1 rounded text-white ${
                        testimonial.active ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                    >
                      {testimonial.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="px-3 py-1 rounded bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-gray-700 italic">"{testimonial.feedback}"</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No testimonials found. Add one above!</div>
          )}
        </div>
      )}
    </section>
  );
}
