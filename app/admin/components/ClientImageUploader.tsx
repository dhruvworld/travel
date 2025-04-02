'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with ssr:false for the component that receives event handlers
const ImageUpload = dynamic(() => import('./ImageUpload'), { ssr: false });

interface ClientImageUploaderProps {
  onImageSelected: (file: File) => void;
  previewImage?: string;
}

export default function ClientImageUploader({ 
  onImageSelected, 
  previewImage 
}: ClientImageUploaderProps) {
  // Keep all event handler logic within the client component
  const handleImageUpload = (file: File) => {
    onImageSelected(file);
  };

  return (
    <ImageUpload
      onImageUpload={handleImageUpload}
      previewImage={previewImage}
    />
  );
}
