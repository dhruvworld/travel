import prisma from '@/lib/prismadb';

export async function getAllPackages() {
  try {
    return await prisma.package.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching all packages:', error);
    throw error;
  }
}

export async function getFeaturedPackages() {
  try {
    return await prisma.package.findMany({
      where: { 
        featured: true,
        published: true 
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    throw error;
  }
}

export async function updateFeaturedStatus(id: string, featured: boolean) {
  try {
    return await prisma.package.update({
      where: { id },
      data: { featured }
    });
  } catch (error) {
    console.error('Error updating package featured status:', error);
    throw error;
  }
}

export async function getPackageById(id: string) {
  try {
    return await prisma.package.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
}

export async function setFeaturedPackages(ids: string[]) {
  try {
    // Reset all packages to not featured
    await prisma.package.updateMany({
      data: { featured: false },
    });

    // Set the provided packages as featured
    await prisma.package.updateMany({
      where: { id: { in: ids } },
      data: { featured: true },
    });
  } catch (error) {
    console.error('Error setting featured packages:', error);
    throw error;
  }
}
