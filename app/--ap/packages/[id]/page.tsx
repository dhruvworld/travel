import { Metadata } from 'next'

// Static package data
const packages = [
  {
    id: "1",
    name: "Bali Adventure",
    description: "Experience the beauty of Bali with our comprehensive tour package.",
    price: 1299,
    duration: "7 days",
    location: "Bali, Indonesia"
  },
  {
    id: "2",
    name: "Paris Getaway",
    description: "Discover the romance of Paris with our exclusive package.",
    price: 1499,
    duration: "5 days",
    location: "Paris, France"
  },
  {
    id: "3",
    name: "Tokyo Explorer",
    description: "Immerse yourself in the vibrant culture of Tokyo.",
    price: 1699,
    duration: "6 days",
    location: "Tokyo, Japan"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <ul className="space-y-2">
            <li><strong>Price:</strong> ${pkg.price}</li>
            <li><strong>Duration:</strong> {pkg.duration}</li>
            <li><strong>Location:</strong> {pkg.location}</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 