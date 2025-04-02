'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  previewImage?: string;
}

export default function ImageUpload({ onImageUpload, previewImage }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`p-6 border-2 border-dashed rounded-lg cursor-pointer text-center ${
          isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-indigo-500">Drop the image here...</p>
        ) : (
          <p className="text-gray-500">
            Drag & drop an image here, or click to select one
          </p>
        )}
      </div>
      
      {previewImage && (
        <div className="relative w-full h-48 overflow-hidden rounded-lg">
          <Image 
            src={previewImage}
            alt="Preview" 
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}