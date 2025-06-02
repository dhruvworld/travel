"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidImagePath = getValidImagePath;
/**
 * Utility function to get fallback image paths when original images aren't available
 * @param path Original image path
 * @returns A valid image path that exists in the project
 */
function getValidImagePath(path) {
    // Map of missing images to existing alternatives
    var imageMap = {
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
