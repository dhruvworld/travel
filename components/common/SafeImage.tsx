'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { getValidImagePath } from '@/lib/imageUtils';

export default function SafeImage(props: ImageProps) {
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(props.src as string);
  
  useEffect(() => {
    // Reset error state when src changes
    setError(false);
    setImageSrc(props.src as string);
  }, [props.src]);
  
  const handleError = () => {
    // First try the mapped path
    const mappedPath = getValidImagePath(props.src as string);
    if (mappedPath !== props.src) {
      setImageSrc(mappedPath);
    } else {
      // If still failing or no mapping exists, use default fallback
      setError(true);
    }
  };
  
  return (
    <Image
      {...props}
      src={error ? '/images/placeholder-package.jpg' : imageSrc}
      onError={handleError}
      alt={props.alt || 'Image'}
    />
  );
}
