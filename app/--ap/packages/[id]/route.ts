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
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  inclusions: string[];
  exclusions: string[];
}

// Static packages data
const packages: { [key: string]: Package } = {
  "1": {
    id: "1",
    name: "Bali Adventure",
    description: "Experience the beauty of Bali with our comprehensive tour package. Visit stunning beaches, ancient temples, and lush rice terraces.",
    price: 1299,
    duration: "7 days",
    location: "Bali, Indonesia",
    imageUrl: "/images/packages/bali/1.jpg",
    rating: 4.8,
    reviews: 156,
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali",
        description: "Welcome to Bali! Transfer to your hotel and enjoy a welcome dinner."
      },
      {
        day: 2,
        title: "Ubud Cultural Tour",
        description: "Visit the Sacred Monkey Forest and Ubud Palace."
      }
    ],
    inclusions: [
      "Airport transfers",
      "7 nights accommodation",
      "Daily breakfast",
      "Guided tours",
      "Welcome dinner"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  "2": {
    id: "2",
    name: "Paris Getaway",
    description: "Discover the romance of Paris with our exclusive package. Visit iconic landmarks, enjoy French cuisine, and explore charming neighborhoods.",
    price: 1499,
    duration: "5 days",
    location: "Paris, France",
    imageUrl: "/images/packages/paris/1.jpg",
    rating: 4.9,
    reviews: 203,
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paris",
        description: "Welcome to Paris! Transfer to your hotel and enjoy a Seine River cruise."
      },
      {
        day: 2,
        title: "City Highlights",
        description: "Visit the Eiffel Tower and Louvre Museum."
      }
    ],
    inclusions: [
      "Airport transfers",
      "5 nights accommodation",
      "Daily breakfast",
      "Guided tours",
      "Seine River cruise"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  },
  "3": {
    id: "3",
    name: "Tokyo Explorer",
    description: "Immerse yourself in the vibrant culture of Tokyo. Experience traditional and modern Japan, from ancient temples to futuristic districts.",
    price: 1699,
    duration: "6 days",
    location: "Tokyo, Japan",
    imageUrl: "/images/packages/tokyo/1.jpg",
    rating: 4.7,
    reviews: 178,
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Tokyo",
        description: "Welcome to Tokyo! Transfer to your hotel and enjoy a traditional dinner."
      },
      {
        day: 2,
        title: "City Exploration",
        description: "Visit Senso-ji Temple and explore Asakusa district."
      }
    ],
    inclusions: [
      "Airport transfers",
      "6 nights accommodation",
      "Daily breakfast",
      "Guided tours",
      "Traditional dinner"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  }
};

// Fetch a specific package
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const packageData = packages[params.id];
  if (!packageData) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }
  return NextResponse.json(packageData);
}

// Update a package
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  // In a real application, you would update this in a database
  // For now, we'll just return a success message
  return NextResponse.json({ message: "Package updated successfully" });
}

// Delete a package
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // In a real application, you would delete this from a database
  // For now, we'll just return a success message
  return NextResponse.json({ message: "Package deleted successfully" });
} 