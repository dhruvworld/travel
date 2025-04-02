'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  label?: string;
  initialImage?: string;
}

export default function FileUpload({ onUploadComplete, label = 'Upload Image', initialImage }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(initialImage || '');

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      onUploadComplete(data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onUploadComplete]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div className="flex items-center gap-4">
        <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
          {isUploading ? 'Uploading...' : 'Select Image'}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
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
    </div>
  );
}
