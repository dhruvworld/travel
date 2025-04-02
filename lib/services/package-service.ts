import { getFeaturedPackages as getPrismaFeaturedPackages } from '@/lib/prisma/packages';

export async function getFeaturedPackages() {
  try {
    // Use the existing prisma function to get featured packages
    const packages = await getPrismaFeaturedPackages();
    
    // Transform the data to match what the UI expects
    return packages.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      // location isn't in the schema, provide a default or fallback value
      location: 'India', // Default location since it's not in the schema
      image: pkg.image || '/images/destinations/default.jpg',
      slug: pkg.slug || pkg.id // Use slug if available, fallback to ID
    }));
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    return [];
  }
}
