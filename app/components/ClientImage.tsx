'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ClientImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export default function ClientImage({
  src, 
  alt, 
  fallbackSrc = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2574&auto=format&fit=crop",
  fill = false,
  className = "",
  priority = false,
  width,
  height
}: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
