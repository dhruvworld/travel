import { getFeaturedPackages as getPrismaFeaturedPackages } from '../prisma/packages';

/**
 * Fetches featured packages with error handling
 */
export async function getFeaturedPackages() {
  console.log('service: Attempting to fetch featured packages...');
  try {
    // Ensure we have a valid function to call
    if (typeof getPrismaFeaturedPackages !== 'function') {
      console.error('getPrismaFeaturedPackages is not a function');
      return [];
    }

    const packages = await getPrismaFeaturedPackages();
    console.log(`service: Retrieved ${packages?.length || 0} packages from database`);
    return packages || [];
  } catch (error) {
    console.error("service: Error getting featured packages:", error);
    return []; // Return empty array to allow fallback to static data
  }
}
