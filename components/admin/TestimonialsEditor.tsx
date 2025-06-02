"use client";

import { useState, useEffect } from 'react';
import { Star, Trash, Edit, Save, X } from 'lucide-react';
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

export default function TestimonialsEditor() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    country: '',
    feedback: '',
    stars: 5,
    image: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/testimonials');
      if (!response.ok) throw new Error('Failed to fetch testimonials');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial)
      });

      if (!response.ok) throw new Error('Failed to add testimonial');

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
    if (!editForm) return;
    if (!editForm.name || !editForm.feedback) {
      toast.error('Name and feedback are required');
      return;
    }

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) throw new Error('Failed to update testimonial');

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
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) throw new Error('Failed to delete testimonial');

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          active: !currentActive
        })
      });

      if (!response.ok) throw new Error('Failed to update testimonial');

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading testimonials...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showAddForm ? 'Cancel' : 'Add New Testimonial'}
      </button>
      
      {showAddForm && (
        <div className="border p-4 rounded-lg">
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
                />
              </div>
            </div>
            
            <button
              onClick={handleAddTestimonial}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Testimonial
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {testimonials.length > 0 ? (
          testimonials.map(testimonial => (
            <div 
              key={testimonial.id} 
              className={`border p-4 rounded-lg ${
                !testimonial.active ? 'opacity-70 bg-gray-50' : 'bg-white'
              }`}
            >
              {editingId === testimonial.id ? (
                // Edit mode
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={editForm?.name}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={editForm?.country}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feedback *</label>
                    <textarea
                      name="feedback"
                      value={editForm?.feedback}
                      onChange={handleEditChange}
                      rows={3}
                      className="w-full p-2 border rounded"
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
                        value={editForm?.stars}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded"
                      />
                      <div className="flex mt-2">
                        {editForm ? renderStars(editForm.stars) : null}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        value={editForm?.image}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditForm(null);
                      }}
                      className="flex items-center px-3 py-1.5 border rounded"
                    >
                      <X size={14} className="mr-1" /> Cancel
                    </button>
                    <button
                      onClick={handleUpdateTestimonial}
                      className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <Save size={14} className="mr-1" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                // View mode
                <>
                  <div className="flex justify-between">
                    <div className="flex">
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
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleActive(testimonial.id, testimonial.active)}
                        className={`px-3 py-1 rounded text-white ${
                          testimonial.active ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      >
                        {testimonial.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(testimonial.id);
                          setEditForm(testimonial);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700 italic">"{testimonial.feedback}"</p>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
            No testimonials found. Add some using the button above.
          </div>
        )}
      </div>
    </div>
  );
}
