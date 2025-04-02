import prisma from '@/lib/prisma'

export async function saveImageToDatabase(url: string, publicId: string, category?: string, alt?: string) {
  return await prisma.image.create({
    data: {
      url,
      cloudId: publicId, // Use cloudId as per schema
      category: category || null,
      alt: alt || null,
    },
  })
}

export async function getImages(category?: string) {
  const whereClause = category ? { category } : undefined
  
  return await prisma.image.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

/**
 * Default image placeholders and image utility functions
 */

// Default placeholder for missing profile images
export const DEFAULT_PROFILE_IMAGE = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

// Default placeholder for missing tour package images
export const DEFAULT_PACKAGE_IMAGE = "/images/placeholder-package.jpg";

// Default placeholder for missing hotel images
export const DEFAULT_HOTEL_IMAGE = "/images/placeholder-hotel.jpg";

/**
 * Returns an appropriate image URL, falling back to a placeholder if the image is missing
 */
export function getImageUrl(imageUrl: string | null | undefined, type: 'profile' | 'package' | 'hotel' = 'package'): string {
  if (!imageUrl) {
    switch (type) {
      case 'profile':
        return DEFAULT_PROFILE_IMAGE;
      case 'hotel':
        return DEFAULT_HOTEL_IMAGE;
      case 'package':
      default:
        return DEFAULT_PACKAGE_IMAGE;
    }
  }
  
  return imageUrl;
}
