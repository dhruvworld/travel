'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  title: string;
  url: string;
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState({
    title: '',
    url: ''
  });

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/gallery');
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

    fetchGallery();
  }, []);

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
      toast.success('Image added successfully');
    } catch (error) {
      console.error('Error adding image:', error);
      toast.error('Failed to add image');
    }
  };

  const handleDelete = async (id: string) => {
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

  return (
    <section className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Manage Gallery</h2>

      {/* Add new image form */}
      <div className="border p-4 rounded-lg shadow bg-white">
        <h3 className="font-semibold mb-4">Add New Image</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newImage.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Image title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
            <input
              type="text"
              name="url"
              value={newImage.url}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <button
            onClick={handleAddImage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Gallery
          </button>
        </div>
      </div>

      {/* Gallery grid */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length > 0 ? (
            images.map(image => (
              <div key={image.id} className="relative group">
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
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
                {image.title && (
                  <p className="mt-1 text-sm text-gray-700 truncate">{image.title}</p>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No images in gallery. Add some above!
            </div>
          )}
        </div>
      )}
    </section>
  );
}
