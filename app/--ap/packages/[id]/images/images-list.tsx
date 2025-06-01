'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PackageImage {
  id: string;
  url: string;
  caption: string;
}

export default function ImagesList({ packageId }: { packageId: string }) {
  const [images, setImages] = useState<PackageImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`/api/packages/${packageId}/images`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [packageId]);

  if (loading) {
    return <p className="text-gray-600">Loading images...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (images.length === 0) {
    return <p className="text-gray-600">No images available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
          <Image
            src={image.url}
            alt={image.caption}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <p className="text-sm">{image.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 