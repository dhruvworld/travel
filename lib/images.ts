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
