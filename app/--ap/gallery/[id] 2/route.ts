// app/api/gallery/route.ts
import { NextResponse } from 'next/server';

// Static gallery data
const galleryImages = [
  {
    id: "1",
    title: "Mountain View",
    description: "Beautiful mountain landscape",
    imageUrl: "/images/gallery/mountain.jpg",
    category: "Nature"
  },
  {
    id: "2",
    title: "Beach Sunset",
    description: "Stunning sunset at the beach",
    imageUrl: "/images/gallery/beach.jpg",
    category: "Nature"
  },
  {
    id: "3",
    title: "City Lights",
    description: "City skyline at night",
    imageUrl: "/images/gallery/city.jpg",
    category: "Urban"
  }
];

// Fetch all gallery images
export async function GET() {
  return NextResponse.json(galleryImages);
}

// Add a new gallery image (no ID dependency)
export async function POST(req: Request) {
  const data = await req.json();
  // In a real application, you would save this to a database
  // For now, we'll just return a success message
  return NextResponse.json({ message: "Image added to gallery" });
}
