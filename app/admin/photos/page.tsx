'use client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Photo {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  location: string;
  isActive: boolean;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    isActive: true
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    setTimeout(() => {
      setPhotos([
        { 
          id: '1', 
          title: 'Taj Mahal Sunset', 
          description: 'Beautiful sunset view of Taj Mahal', 
          imageUrl: '/images/taj-mahal.svg', 
          location: 'Agra', 
          isActive: true 
        },
        { 
          id: '2', 
          title: 'Jaipur Palace', 
          description: 'City Palace architecture', 
          imageUrl: '/images/jaipur.svg', 
          location: 'Jaipur', 
          isActive: true 
        },
        { 
          id: '3', 
          title: 'Kerala Houseboat', 
          description: 'Traditional houseboat on backwaters', 
          imageUrl: '/images/kerala.svg', 
          location: 'Kerala', 
          isActive: true 
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddClick = () => {
    setModalMode('add');
    setCurrentPhoto(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      isActive: true
    });
    setPreviewUrl('');
    setShowModal(true);
  };

  const handleEditClick = (photo: Photo) => {
    setModalMode('edit');
    setCurrentPhoto(photo);
    setFormData({
      title: photo.title,
      description: photo.description || '',
      location: photo.location,
      isActive: photo.isActive
    });
    setPreviewUrl(photo.imageUrl);
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      // TODO: Replace with actual API call
      setPhotos(photos.filter(photo => photo.id !== id));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with actual API call
    if (modalMode === 'add') {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        location: formData.location,
        imageUrl: previewUrl || '/images/placeholder.svg',
        isActive: formData.isActive
      };
      setPhotos([...photos, newPhoto]);
    } else if (modalMode === 'edit' && currentPhoto) {
      const updatedPhotos = photos.map(photo => 
        photo.id === currentPhoto.id 
          ? { 
              ...photo, 
              title: formData.title,
              description: formData.description,
              location: formData.location,
              imageUrl: previewUrl || photo.imageUrl,
              isActive: formData.isActive
            } 
          : photo
      );
      setPhotos(updatedPhotos);
    }
    
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tour Photos</h2>
        <button 
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Upload New Photo
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{photo.location}</p>
              {photo.description && (
                <p className="text-gray-500 text-sm mb-4">{photo.description}</p>
              )}
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  photo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {photo.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="space-x-2">
                  <button 
                    onClick={() => handleEditClick(photo)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(photo.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === 'add' ? 'Upload New Photo' : 'Edit Photo'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
                >
                  {previewUrl ? (
                    <div className="relative h-40 mb-2">
                      <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center">
                      <span className="text-gray-500">Click to select an image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {modalMode === 'add' ? 'Upload' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}