import { Metadata } from 'next'
import Image from 'next/image'

interface PackageImage {
  id: string;
  url: string;
  caption: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Static package data
const packages = [
  {
    id: "1",
    name: "Bali Adventure",
    description: "Experience the beauty of Bali with our comprehensive tour package.",
    duration: "7 days",
    location: "Bali, Indonesia",
    images: [
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
    reviews: [
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
    ]
  },
  {
    id: "2",
    name: "Paris Getaway",
    description: "Discover the romance of Paris with our exclusive package.",
    duration: "5 days",
    location: "Paris, France",
    images: [
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
    reviews: [
      {
        id: "3",
        userId: "user3",
        userName: "Mike Johnson",
        rating: 5,
        comment: "Paris was magical! The Eiffel Tower at night was breathtaking.",
        createdAt: "2024-03-12T09:15:00Z"
      }
    ]
  },
  {
    id: "3",
    name: "Tokyo Explorer",
    description: "Immerse yourself in the vibrant culture of Tokyo.",
    duration: "6 days",
    location: "Tokyo, Japan",
    images: [
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
    ],
    reviews: [
      {
        id: "4",
        userId: "user4",
        userName: "Sarah Wilson",
        rating: 4,
        comment: "Tokyo was incredible. The food and culture were amazing.",
        createdAt: "2024-03-08T14:45:00Z"
      }
    ]
  }
];

export async function generateStaticParams() {
  return packages.map((pkg) => ({
    id: pkg.id,
  }))
}

interface PackageParams {
  params: { id: string }
}

export async function generateMetadata({ params }: PackageParams): Promise<Metadata> {
  const pkg = packages.find(p => p.id === params.id);
  
  return {
    title: pkg?.name || 'Travel Package',
    description: pkg?.description || 'Explore our amazing travel packages',
  }
}

export default function PackagePage({ params }: PackageParams) {
  const pkg = packages.find(p => p.id === params.id);

  if (!pkg) {
    return <div>Package not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{pkg.name}</h1>
      <p className="text-gray-600 mb-4">{pkg.description}</p>
      
      {/* Package Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {pkg.images.map((image) => (
          <div key={image.id} className="relative aspect-video">
            <Image
              src={image.url}
              alt={image.caption}
              fill
              className="object-cover rounded-lg"
            />
            <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
              {image.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Package Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <ul className="space-y-2">
            <li><strong>Duration:</strong> {pkg.duration}</li>
            <li><strong>Location:</strong> {pkg.location}</li>
          </ul>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {pkg.reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{review.userName}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{review.rating}/5</span>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 