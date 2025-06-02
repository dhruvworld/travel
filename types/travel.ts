export interface TravelPackage {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  featured: boolean;
  duration: string;
  location: string;
  category: string;
  amenities: string[];
  itinerary: {
    day: number;
    description: string;
  }[];
} 