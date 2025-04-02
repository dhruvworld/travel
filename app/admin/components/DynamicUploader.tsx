'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DynamicUploaderProps {
  onImageUpload: (url: string) => void;
}

export default function DynamicUploader({ onImageUpload }: DynamicUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      setPreview(data.url);
      onImageUpload(data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">
          {isUploading ? 'Uploading...' : 'Select Image'}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
        
        {preview && (
          <div className="relative h-16 w-16 overflow-hidden rounded-md">
            <Image 
              src={preview} 
              alt="Preview" 
              fill 
              className="object-cover" 
            />
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-500">
        Upload an image file (JPG, PNG, or WebP) up to 5MB.
      </p>
    </div>
  );
}
