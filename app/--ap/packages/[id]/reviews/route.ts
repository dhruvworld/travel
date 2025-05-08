import { NextResponse } from 'next/server';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface PackageReviews {
  [key: string]: Review[];
}

// Static reviews data
const packageReviews: PackageReviews = {
  "1": [
    {
      id: "1",
      userId: "user1",
      userName: "John Doe",
      rating: 5,
      comment: "Amazing experience in Bali! The beaches were beautiful and the culture was fascinating.",
      createdAt: "2024-03-15T10:00:00Z"
    },
    {
      id: "2",
      userId: "user2",
      userName: "Jane Smith",
      rating: 4,
      comment: "Great trip overall. The accommodations were comfortable and the activities were well-organized.",
      createdAt: "2024-03-10T15:30:00Z"
    }
  ],
  "2": [
    {
      id: "3",
      userId: "user3",
      userName: "Mike Johnson",
      rating: 5,
      comment: "Paris was magical! The Eiffel Tower at night was breathtaking.",
      createdAt: "2024-03-12T09:15:00Z"
    }
  ],
  "3": [
    {
      id: "4",
      userId: "user4",
      userName: "Sarah Wilson",
      rating: 4,
      comment: "Tokyo was incredible. The food and culture were amazing.",
      createdAt: "2024-03-08T14:45:00Z"
    }
  ]
};

// Fetch package reviews
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const reviews = packageReviews[params.id] || [];
  return NextResponse.json(reviews);
}

// Add a new review
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  // In a real application, you would save this to a database
  // For now, we'll just return a success message
  return NextResponse.json({ message: "Review added successfully" });
} 