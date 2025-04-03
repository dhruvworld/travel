/**
 * Utility function to get fallback image paths when original images aren't available
 * @param path Original image path
 * @returns A valid image path that exists in the project
 */
export function getValidImagePath(path: string): string {
  // Map of missing images to existing alternatives
  const imageMap: Record<string, string> = {
    "/destinations/golden-triangle.jpg": "/images/rajasthan.jpg",
    "/destinations/kerala.jpg": "/images/kerala-backwaters.jpg",
    "/destinations/varanasi.jpg": "/images/varanasi.jpg",
    "/images/about-us.jpg": "/images/placeholder-package.jpg",
    "/images/golden-triangle.jpg": "/images/rajasthan.jpg",
    "/images/kerala.jpg": "/images/kerala-backwaters.jpg",
    // Add more mappings as needed
  };
  
  return imageMap[path] || path;
}
