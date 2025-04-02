import { prisma } from "./client";

export async function getFeaturedPackages() {
  try {
    const featuredPackages = await prisma.tourPackage.findMany({
      where: {
        featured: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        duration: true,
        image: true,
        slug: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
    });
    
    return featuredPackages;
  } catch (error) {
    console.error("Error getting featured packages:", error);
    return [];
  }
}

export async function getAllPackages() {
  try {
    const packages = await prisma.tourPackage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return packages;
  } catch (error) {
    console.error("Error getting all packages:", error);
    return [];
  }
}

export async function getPackageById(id: string) {
  try {
    const tourPackage = await prisma.tourPackage.findUnique({
      where: { id },
    });
    
    return tourPackage;
  } catch (error) {
    console.error(`Error getting package with id ${id}:`, error);
    return null;
  }
}
