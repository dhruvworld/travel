export interface PackageItem {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    location: string;
    image: string;
    highlights: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  