'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface GalleryImage {
  id: string;
  url: string;
  category: string;
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch gallery images');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        toast.error('Failed to load gallery images.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete image');
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success('Image deleted successfully.');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image.');
    }
  };

  if (isLoading) {
    return <div>Loading gallery images...</div>;
  }

  return (
    <div>
      <h1>Manage Gallery</h1>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={image.url} alt={image.category} />
            <button onClick={() => handleDelete(image.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
