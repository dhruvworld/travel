"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Trash, Upload, X, PlusCircle } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import Image from 'next/image';

type GalleryImage = {
  id: string;
  title: string;
  url: string;
};

export default function GalleryTab() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({
    title: '',
    url: ''
  });

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  async function fetchGalleryImages() {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/gallery');
      if (!response.ok) throw new Error('Failed to fetch gallery images');
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
      const response = await axios.post('/api/admin/gallery', newImage);
      setImages([response.data, ...images]);
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
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await axios.delete('/api/admin/gallery', {
        data: { id }
      });
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-500">Loading gallery images...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Manage images displayed in the gallery section on the homepage.
        </p>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <PlusCircle size={16} className="mr-1" />
          {showAddForm ? 'Cancel' : 'Add Image'}
        </button>
      </div>

      {/* Add new image form */}
      {showAddForm && (
        <div className="border rounded-lg p-4 bg-gray-50 mb-4">
          <h3 className="font-medium mb-3">Add New Image</h3>
          <div className="mb-4">
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
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <ImageUpload 
              onUploadComplete={handleImageUpload}
              className="mt-1"
            />
          </div>
          
          {newImage.url && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
              <div className="relative h-40 w-40">
                <img 
                  src={newImage.url} 
                  alt="Preview" 
                  className="h-full w-full object-cover rounded" 
                />
                <button 
                  onClick={() => setNewImage({...newImage, url: ''})}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              onClick={handleAddImage}
              disabled={!newImage.url}
              className={`px-4 py-2 rounded transition ${
                newImage.url 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add to Gallery
            </button>
          </div>
        </div>
      )}

      {/* Gallery grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map(image => (
            <div key={image.id} className="group relative">
              <div className="aspect-square relative overflow-hidden rounded-lg border">
                <Image
                  src={image.url}
                  alt={image.title || 'Gallery image'}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  title="Delete image"
                >
                  <Trash size={16} />
                </button>
              </div>
              {image.title && (
                <p className="mt-1 text-sm text-gray-700 truncate">{image.title}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
          No images in gallery. Add some using the button above.
        </div>
      )}
    </div>
  );
}
