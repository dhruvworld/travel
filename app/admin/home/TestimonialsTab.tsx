"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Star, Trash, X, Save, PlusCircle } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

type Testimonial = {
  id: string;
  name: string;
  country?: string;
  feedback: string;
  stars: number;
  image?: string;
  active: boolean;
};

export default function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Testimonial | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    country: '',
    feedback: '',
    stars: 5,
    image: ''
  });

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
      const response = await axios.post('/api/admin/testimonials', newTestimonial);
      setTestimonials([response.data, ...testimonials]);
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

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditMode(testimonial.id);
    setEditForm(testimonial);
  };

  const handleSaveEdit = async () => {
    if (!editForm) return;
    if (!editForm.name || !editForm.feedback) {
      toast.error('Name and feedback are required');
      return;
    }

    try {
      const response = await axios.put('/api/admin/testimonials', editForm);
      setTestimonials(testimonials.map(t => t.id === editForm.id ? response.data : t));
      setEditMode(null);
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
      await axios.delete('/api/admin/testimonials', {
        data: { id }
      });
      setTestimonials(testimonials.filter(t => t.id !== id));
      toast.success('Testimonial deleted successfully');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await axios.put('/api/admin/testimonials', {
        id,
        active: !currentActive
      });
      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, active: !currentActive } : t
      ));
      toast.success(`Testimonial ${!currentActive ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error updating testimonial status:', error);
      toast.error('Failed to update testimonial');
    }
  };

  const handleImageUpload = (url: string, isNewForm: boolean) => {
    if (isNewForm) {
      setNewTestimonial({
        ...newTestimonial,
        image: url
      });
    } else if (editForm) {
      setEditForm({
        ...editForm,
        image: url
      });
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Manage customer testimonials displayed on the homepage.
        </p>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <PlusCircle size={16} className="mr-1" />
          {showAddForm ? 'Cancel' : 'Add Testimonial'}
        </button>
      </div>

      {/* Add new testimonial form */}
      {showAddForm && (
        <div className="border rounded-lg p-4 bg-gray-50 mb-4">
          <h3 className="font-medium mb-3">Add New Testimonial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          
          <div className="mb-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5 stars)</label>
              <input 
                type="range" 
                name="stars" 
                min="1" 
                max="5" 
                value={newTestimonial.stars} 
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex mt-1">{renderStars(newTestimonial.stars)}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
              {newTestimonial.image ? (
                <div className="relative h-20 w-20">
                  <img 
                    src={newTestimonial.image} 
                    alt="Profile" 
                    className="h-full w-full object-cover rounded-full" 
                  />
                  <button 
                    onClick={() => setNewTestimonial({...newTestimonial, image: ''})}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <ImageUpload 
                  onUploadComplete={(url) => handleImageUpload(url, true)}
                  className="mt-1"
                />
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleAddTestimonial}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add Testimonial
            </button>
          </div>
        </div>
      )}

      {/* List of testimonials */}
      <div className="space-y-4">
        {testimonials.length > 0 ? (
          testimonials.map(testimonial => (
            <div 
              key={testimonial.id} 
              className={`border p-4 rounded-lg ${!testimonial.active ? 'opacity-70 bg-gray-50' : 'bg-white'}`}
            >
              {editMode === testimonial.id ? (
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
                        type="range" 
                        name="stars" 
                        min="1" 
                        max="5" 
                        value={editForm?.stars} 
                        onChange={handleEditChange}
                        className="w-full"
                      />
                      <div className="flex mt-1">{renderStars(editForm?.stars || 5)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                      {editForm?.image ? (
                        <div className="relative h-20 w-20">
                          <img 
                            src={editForm.image} 
                            alt="Profile" 
                            className="h-full w-full object-cover rounded-full" 
                          />
                          <button 
                            onClick={() => setEditForm({...editForm, image: ''})}
                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <ImageUpload 
                          onUploadComplete={(url) => handleImageUpload(url, false)}
                          className="mt-1"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditMode(null);
                        setEditForm(null);
                      }}
                      className="px-3 py-1.5 bg-gray-200 rounded hover:bg-gray-300 transition text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm flex items-center"
                    >
                      <Save size={16} className="mr-1" />
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                // View mode
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {testimonial.image && (
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{testimonial.name}</h3>
                        {testimonial.country && (
                          <p className="text-sm text-gray-500">{testimonial.country}</p>
                        )}
                        <div className="flex mt-1">{renderStars(testimonial.stars)}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleActive(testimonial.id, testimonial.active)}
                        className={`px-2 py-1 text-xs rounded ${
                          testimonial.active 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {testimonial.active ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        onClick={() => handleEditTestimonial(testimonial)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
            No testimonials found. Add some using the button above.
          </div>
        )}
      </div>
    </div>
  );
}
