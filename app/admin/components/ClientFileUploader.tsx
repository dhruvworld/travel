'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr:false
const FileUpload = dynamic(() => import('./FileUpload'), { ssr: false });

interface ClientFileUploaderProps {
  initialImage?: string;
  fieldName: string;
  onImageUpdate: (fieldName: string, imageUrl: string) => void;
  label?: string;
}

export default function ClientFileUploader({
  initialImage,
  fieldName,
  onImageUpdate,
  label = 'Upload Image'
}: ClientFileUploaderProps) {
  // Create a new handler function in the client component context
  const handleUploadComplete = (url: string) => {
    onImageUpdate(fieldName, url);
  };
  
  return (
    <FileUpload
      onUploadComplete={handleUploadComplete}
      label={label}
      initialImage={initialImage}
    />
  );
}
