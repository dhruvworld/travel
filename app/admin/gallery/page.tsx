'use client';

import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import ImageUpload from '@/components/admin/ImageUpload';
import { getAllOffers } from "../../lib/services/firebase-offer";

interface GalleryImage {
  id: string;
  title: string;
  url: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState({
    title: '',
    url: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  async function fetchGalleryImages() {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery');
      if (!response.ok) {
        throw new Error('Failed to fetch gallery images');
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast.error('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewImage({
      ...newImage,
      [name]: value
    });
  };

  const handleAddImage = async () => {
    if (!newImage.url) {
      toast.error('Image URL is required');
      return;
    }

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newImage)
      });

      if (!response.ok) {
        throw new Error('Failed to add image');
      }

      const addedImage = await response.json();
      setImages([addedImage, ...images]);
      setNewImage({
        title: '',
        url: ''
      });
      setShowAddForm(false);
      toast.success('Image added successfully');
    } catch (error) {
      console.error('Error adding image:', error);
      toast.error('Failed to add image');
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      setImages(images.filter(img => img.id !== id));
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleImageUpload = (url: string) => {
    setNewImage({
      ...newImage,
      url
    });
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Gallery Management</h1>
        <p className="text-gray-600">Add, edit or remove images from your travel gallery</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Travel Photos</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showAddForm ? 'Cancel' : 'Add New Image'}
          </button>
        </div>

        {/* Add Image Form */}
        {showAddForm && (
          <div className="mb-8 p-4 border rounded-md bg-gray-50">
            <h3 className="text-lg font-medium mb-4">Add New Image</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Title</label>
                <input
                  type="text"
                  name="title"
                  value={newImage.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter image title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="url"
                  value={newImage.url}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Or Upload Image</label>
                <ImageUpload onUploadComplete={handleImageUpload} />
              </div>

              {newImage.url && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="relative h-40 w-full md:w-1/3 rounded-md overflow-hidden">
                    <Image
                      src={newImage.url}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleAddImage}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={!newImage.url}
                >
                  Add to Gallery
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-500">Loading gallery images...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.length > 0 ? (
              images.map(image => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square relative rounded-md overflow-hidden border">
                    <Image
                      src={image.url}
                      alt={image.title || 'Gallery image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  {image.title && (
                    <p className="mt-1 text-sm font-medium truncate">{image.title}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No images in gallery. Add some using the button above.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
