export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  type: 'trip' | 'contact';
  numTravelers?: number;
  travelDate?: string;
}
