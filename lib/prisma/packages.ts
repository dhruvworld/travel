import { prisma } from "./client";

export async function getFeaturedPackages() {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database query timeout")), 5000)
    );

    const queryPromise = prisma.tourPackage.findMany({
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
        createdAt: "desc",
      },
      take: 6,
    });

    const featuredPackages = await Promise.race([
      queryPromise,
      timeoutPromise,
    ]) as any;

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
        createdAt: "desc",
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

export async function setFeaturedPackages(packageIds: string[], featured: boolean) {
  try {
    const updatePromises = packageIds.map((id) =>
      prisma.tourPackage.update({
        where: { id },
        data: { featured },
      })
    );

    await Promise.all(updatePromises);
    return { success: true };
  } catch (error) {
    console.error("Error setting featured packages:", error);
    return { success: false, error };
  }
}
