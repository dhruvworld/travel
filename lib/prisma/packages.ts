// Import directly from the db folder to avoid circular dependencies
import prisma from '../db/prisma';

/**
 * Fetches featured tour packages with timeout handling
 */
export async function getFeaturedPackages() {
  try {
    console.log('Starting to fetch featured packages...');
    
    // First check if we can connect to the database at all
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('Database connection verified');
    } catch (connectionError) {
      console.error('Database connection failed:', connectionError);
      // If we can't connect to the database, return empty array immediately
      return [];
    }

    // Check which models are available
    const models = Object.keys(prisma).filter(key => 
      !key.startsWith('_') && typeof prisma[key] === 'object'
    );
    console.log('Available models:', models);

    // Determine which model to use based on what's available
    let modelToUse = 'package';
    if (!models.includes('package') && models.includes('tourPackage')) {
      modelToUse = 'tourPackage';
    }
    
    console.log(`Using model: ${modelToUse}`);

    // Use timeouts to prevent hanging
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database query timeout")), 10000)
    );

    // Use dynamic property access to avoid TypeScript errors
    const queryPromise = prisma[modelToUse].findMany({
      where: {
        featured: true,
        isActive: true,
      },
      take: 6,
    });

    // Race between the actual query and the timeout
    const packages = await Promise.race([queryPromise, timeoutPromise]);
    console.log(`Found ${packages.length} featured packages`);
    return packages;
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    // Return empty array on error to allow fallback data to be used
    return [];
  }
}

export async function getAllPackages() {
  try {
    // Check which models are available
    const models = Object.keys(prisma).filter(key => 
      !key.startsWith('_') && typeof prisma[key] === 'object'
    );
    
    // Determine which model to use based on what's available
    let modelToUse = 'package';
    if (!models.includes('package') && models.includes('tourPackage')) {
      modelToUse = 'tourPackage';
    }
    
    console.log(`Using model for getAllPackages: ${modelToUse}`);

    // Use dynamic property access to avoid TypeScript errors
    const packages = await prisma[modelToUse].findMany({
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
    // Check which models are available
    const models = Object.keys(prisma).filter(key => 
      !key.startsWith('_') && typeof prisma[key] === 'object'
    );
    
    // Determine which model to use based on what's available
    let modelToUse = 'package';
    if (!models.includes('package') && models.includes('tourPackage')) {
      modelToUse = 'tourPackage';
    }
    
    // Use dynamic property access to avoid TypeScript errors
    const packageData = await prisma[modelToUse].findUnique({
      where: { id },
    });

    return packageData;
  } catch (error) {
    console.error(`Error getting package with id ${id}:`, error);
    return null;
  }
}

export async function setFeaturedPackages(packageIds: string[], featured: boolean) {
  try {
    // Check which models are available
    const models = Object.keys(prisma).filter(key => 
      !key.startsWith('_') && typeof prisma[key] === 'object'
    );
    
    // Determine which model to use based on what's available
    let modelToUse = 'package';
    if (!models.includes('package') && models.includes('tourPackage')) {
      modelToUse = 'tourPackage';
    }
    
    // Use dynamic property access to avoid TypeScript errors
    const updatePromises = packageIds.map((id) =>
      prisma[modelToUse].update({
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
