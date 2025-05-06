'use client';

import { useState, useEffect } from 'react';
import { Star, Trash, Edit, Check, X, Pencil } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  country?: string;
  feedback: string;
  stars: number;
  image?: string;
  active: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    country: '',
    feedback: '',
    stars: 5,
    image: ''
  });
  
  const [editForm, setEditForm] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial({
      ...newTestimonial,
      [name]: name === 'stars' ? Math.min(5, Math.max(1, parseInt(value))) : value
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editForm) return;
    
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
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
      setShowAddForm(false);
      toast.success('Testimonial added successfully');
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast.error('Failed to add testimonial');
    }
  };

  const handleUpdateTestimonial = async () => {
    if (!editForm || !editForm.name || !editForm.feedback) {
      toast.error('Name and feedback are required');
      return;
    }

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        throw new Error('Failed to update testimonial');
      }

      const updatedTestimonial = await response.json();
      setTestimonials(testimonials.map(t => 
        t.id === updatedTestimonial.id ? updatedTestimonial : t
      ));
      setEditingId(null);
      setEditForm(null);
      toast.success('Testimonial updated successfully');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast.error('Failed to update testimonial');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
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
        throw new Error('Failed to update testimonial status');
      }

      const updatedTestimonial = await response.json();
      setTestimonials(testimonials.map(t => 
        t.id === id ? updatedTestimonial : t
      ));
      toast.success(`Testimonial ${updatedTestimonial.active ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error updating testimonial status:', error);
      toast.error('Failed to update testimonial status');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setEditForm(testimonial);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
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

  function handleSaveNew(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Testimonials Management</h1>
        <p className="text-gray-600">Add, edit or remove customer testimonials</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Customer Testimonials</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showAddForm ? 'Close Form' : 'Add Testimonial'}
          </button>
        </div>
        {showAddForm && (
          <div className="mb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newTestimonial.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={newTestimonial.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
                <textarea
                  name="feedback"
                  value={newTestimonial.feedback}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded-md"
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
                    className="w-full p-2 border rounded-md"
                  />
                  <div className="flex mt-2">
                    {renderStars(newTestimonial.stars)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={newTestimonial.image}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddTestimonial}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Testimonials List */}
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="border rounded-lg p-4">
            {editingId === testimonial.id ? (
              <div className="bg-gray-50 p-4 -m-4 rounded-lg">
                {/* Edit form */}
                {/* ...existing code... */}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-full bg-gray-200 mr-3"
                      style={{
                        backgroundImage: `url(${testimonial.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                      title="Edit Testimonial"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete Testimonial"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {renderStars(testimonial.stars)}
                </div>
                <p className="text-gray-700">{testimonial.feedback}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
