import { NextResponse } from 'next/server';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  featured: boolean;
}

// Static packages data
const packages: Package[] = [
  {
    id: "1",
    name: "Bali Adventure",
    description: "Experience the beauty of Bali with our comprehensive tour package. Visit stunning beaches, ancient temples, and lush rice terraces.",
    price: 1299,
    duration: "7 days",
    location: "Bali, Indonesia",
    imageUrl: "/images/packages/bali/1.jpg",
    rating: 4.8,
    reviews: 156,
    featured: true
  },
  {
    id: "2",
    name: "Paris Getaway",
    description: "Discover the romance of Paris with our exclusive package. Visit iconic landmarks, enjoy French cuisine, and explore charming neighborhoods.",
    price: 1499,
    duration: "5 days",
    location: "Paris, France",
    imageUrl: "/images/packages/paris/1.jpg",
    rating: 4.9,
    reviews: 203,
    featured: true
  },
  {
    id: "3",
    name: "Tokyo Explorer",
    description: "Immerse yourself in the vibrant culture of Tokyo. Experience traditional and modern Japan, from ancient temples to futuristic districts.",
    price: 1699,
    duration: "6 days",
    location: "Tokyo, Japan",
    imageUrl: "/images/packages/tokyo/1.jpg",
    rating: 4.7,
    reviews: 178,
    featured: true
  }
];

// Fetch all packages
export async function GET() {
  return NextResponse.json(packages);
}

// Add a new package
export async function POST(request: Request) {
  const data = await request.json();
  // In a real application, you would save this to a database
  // For now, we'll just return a success message
  return NextResponse.json({ message: "Package added successfully" });
} 