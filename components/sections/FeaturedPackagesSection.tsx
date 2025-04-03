import ClientImage from '@/app/components/ClientImage';
import Link from 'next/link';
import { getFeaturedPackages } from '@/lib/services/package-service';

export default async function FeaturedPackagesSection() {
  // Fetch featured packages from the server
  const featuredPackages = await getFeaturedPackages();
  
  // Use static data as fallback if no packages are available
  const packages = featuredPackages.length > 0 ? featuredPackages : [
    {
      id: "golden-triangle",
      name: "Golden Triangle Tour",
      image: "/destinations/golden-triangle.jpg",
      price: 29999,
      duration: "6 Days",
      description: "Delhi, Agra, and Jaipur in 6 days",
      location: "North India"
    },
    {
      id: "kerala-backwaters",
      name: "Kerala Backwaters",
      image: "/destinations/kerala.jpg",
      price: 24999,
      duration: "5 Days",
      description: "Explore God's own country",
      location: "Kerala"
    },
    {
      id: "varanasi-spiritual",
      name: "Varanasi Spiritual Tour",
      image: "/destinations/varanasi.jpg",
      price: 19999,
      duration: "4 Days",
      description: "Sacred journey along the Ganges",
      location: "Varanasi"
    }
  ];

  return (
    <section className="py-12 sm:py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-16">
          Top Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-40 sm:h-48">
                <ClientImage
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {pkg.duration}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-indigo-600 font-semibold">From ₹{pkg.price.toLocaleString()}</span>
                  <Link href={`/packages/${pkg.id}`} className="text-sm sm:text-base text-indigo-600 hover:text-indigo-700 font-semibold">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
