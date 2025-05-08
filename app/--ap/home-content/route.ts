// app/api/home-content/route.ts
import { NextResponse } from 'next/server';

// Static home content data
const homeContent = {
  hero: {
    title: "Welcome to Our Travel Agency",
    subtitle: "Discover the World with Us",
    description: "Experience unforgettable journeys with our expert travel services.",
    image: "/images/hero.jpg"
  },
  features: [
    {
      title: "Expert Guides",
      description: "Professional guides to enhance your travel experience",
      icon: "guide"
    },
    {
      title: "Best Prices",
      description: "Competitive rates for all our travel packages",
      icon: "price"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your needs",
      icon: "support"
    }
  ],
  testimonials: [
    {
      name: "John Doe",
      comment: "Amazing experience with this travel agency!",
      rating: 5
    },
    {
      name: "Jane Smith",
      comment: "Best travel service I've ever used.",
      rating: 5
    }
  ]
};

// Fetch home content
export async function GET() {
  return NextResponse.json(homeContent);
}

// Update home content
export async function POST(req: Request) {
  const data = await req.json();
  // In a real application, you would save this to a database
  // For now, we'll just return a success message
  return NextResponse.json({ message: "Home content updated successfully" });
}
