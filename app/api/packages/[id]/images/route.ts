import { NextResponse } from 'next/server';

type PackageImage = {
  id: string;
  url: string;
  caption: string;
};

type PackageImages = {
  [key: string]: PackageImage[];
};

// Static package images data
const packageImages: PackageImages = {
  "1": [
    {
      id: "1",
      url: "/images/packages/bali/1.jpg",
      caption: "Bali Beach Sunset"
    },
    {
      id: "2",
      url: "/images/packages/bali/2.jpg",
      caption: "Temple Visit"
    }
  ],
  "2": [
    {
      id: "3",
      url: "/images/packages/paris/1.jpg",
      caption: "Eiffel Tower"
    },
    {
      id: "4",
      url: "/images/packages/paris/2.jpg",
      caption: "Louvre Museum"
    }
  ],
  "3": [
    {
      id: "5",
      url: "/images/packages/tokyo/1.jpg",
      caption: "Tokyo Tower"
    },
    {
      id: "6",
      url: "/images/packages/tokyo/2.jpg",
      caption: "Shibuya Crossing"
    }
  ]
};

// Fetch package images
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if the id exists in packageImages
  if (!(params.id in packageImages)) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  const images = packageImages[params.id];
  return NextResponse.json(images);
}

// Add a new package image
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if the id exists in packageImages
  if (!(params.id in packageImages)) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  const data = await request.json();
  // In a real application, you would save this to a database
  // For now, we'll just return a success message
  return NextResponse.json({ message: "Image added successfully" });
} 