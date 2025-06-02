export interface CustomPackageRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  duration: string;
  travelers: number;
  message: string;
  createdAt: string;
}

// Save a new custom package request
export function saveCustomPackageRequest(request: Omit<CustomPackageRequest, 'id' | 'createdAt'>): CustomPackageRequest {
  // Get existing requests
  const existingRequests = getCustomPackageRequests();
  
  // Create new request with ID and timestamp
  const newRequest: CustomPackageRequest = {
    ...request,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  // Add to existing requests
  const updatedRequests = [...existingRequests, newRequest];
  
  // Save to localStorage
  localStorage.setItem('customPackageRequests', JSON.stringify(updatedRequests));
  
  return newRequest;
}

// Get all custom package requests
export function getCustomPackageRequests(): CustomPackageRequest[] {
  if (typeof window === 'undefined') return [];
  
  const requests = localStorage.getItem('customPackageRequests');
  return requests ? JSON.parse(requests) : [];
}

// Get a specific custom package request
export function getCustomPackageRequest(id: string): CustomPackageRequest | null {
  const requests = getCustomPackageRequests();
  return requests.find(request => request.id === id) || null;
}

// Delete a custom package request
export function deleteCustomPackageRequest(id: string): void {
  const requests = getCustomPackageRequests();
  const updatedRequests = requests.filter(request => request.id !== id);
  localStorage.setItem('customPackageRequests', JSON.stringify(updatedRequests));
} 