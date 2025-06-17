'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ClientImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fallbackSrc?: string;
}

export default function ClientImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  fallbackSrc = '/images/placeholder.jpg',
}: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);
const [hasLoaded, setHasLoaded] = useState(false);
const handleError = () => {
    if (!isError) {
      setImgSrc(fallbackSrc);
      setIsError(true);
    }
  };

  const imageProps = {
    src: imgSrc,
    alt,
    className,
    onError: handleError,
    priority,
    sizes,
  };

  if (fill) {
return (
      <>
        <Image
          {...imageProps}
          alt={alt || "Image"}
          onLoad={() => setHasLoaded(true)}
          fill
        />
        {!hasLoaded && (
          <Image
            {...imageProps}
            alt={alt || "Loading placeholder"}
            className="blur-2xl scale-110"
            fill
          />
        )}
      </>
    );
  }

  return (
    <>
      <Image
        {...imageProps}
        alt={alt || "Image"}
        onLoad={() => setHasLoaded(true)}
        width={width || 500}
        height={height || 300}
      />
      {!hasLoaded && (
        <Image
          {...imageProps}
          alt={alt || "Loading placeholder"}
          className="blur-2xl scale-110"
          width={width || 500}
          height={height || 300}
        />
      )}
    </>
);
}
