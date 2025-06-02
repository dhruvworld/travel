/**
 * Uploads an image to Cloudinary and returns the secure URL
 * 
 * @param file The file to upload
 * @returns A promise that resolves to the secure URL of the uploaded image
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  // Replace with your actual Cloudinary credentials
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your-upload-preset';

  // Create form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  // Optional parameters
  formData.append('folder', 'travel-site');

  try {
    // Upload to Cloudinary
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed: ' + response.statusText);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Image upload failed. Please try again.');
  }
}

/**
 * Validates if the file is an acceptable image and within size limits
 * 
 * @param file The file to validate
 * @param maxSizeMB Maximum size in MB
 * @returns true if valid, otherwise throws an error
 */
export function validateImageFile(file: File, maxSizeMB = 5): boolean {
  // Check file type
  if (!file.type.match(/^image\/(jpeg|png|gif|webp)$/)) {
    throw new Error('Unsupported file type. Please upload JPEG, PNG, GIF or WEBP.');
  }
  
  // Check file size (convert MB to bytes)
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(`File size too large. Maximum size is ${maxSizeMB}MB.`);
  }
  
  return true;
}
