import Image from 'next/image';
import Link from 'next/link';

const packages = [
  {
    id: 1,
    name: 'Golden Triangle Tour',
    description: 'Experience the magic of Delhi, Agra, and Jaipur with our comprehensive Golden Triangle tour package.',
    duration: '6 Days / 5 Nights',
    price: '₹25,000',
    image: '/images/golden-triangle.jpg',
    highlights: [
      'Visit Taj Mahal in Agra',
      'Explore Red Fort in Delhi',
      'Tour Amber Fort in Jaipur',
      'Luxury accommodation',
      'Professional guide',
      'All transfers included'
    ]
  },
  {
    id: 2,
    name: 'Gujarat Heritage Tour',
    description: 'Discover the rich cultural heritage of Gujarat with visits to ancient temples and historical sites.',
    duration: '5 Days / 4 Nights',
    price: '₹20,000',
    image: '/images/gujarat-heritage.jpg',
    highlights: [
      'Visit Somnath Temple',
      'Explore Rann of Kutch',
      'Gir National Park Safari',
      'Heritage hotel stay',
      'Local cuisine experience',
      'Cultural performances'
    ]
  },
  {
    id: 3,
    name: 'Kerala Backwaters',
    description: 'Cruise through the serene backwaters of Kerala and experience the tranquility of God\'s Own Country.',
    duration: '7 Days / 6 Nights',
    price: '₹30,000',
    image: '/images/kerala-backwaters.jpg',
    highlights: [
      'Houseboat cruise',
      'Ayurvedic treatments',
      'Tea plantation visit',
      'Traditional dance show',
      'Beach activities',
      'Local village tour'
    ]
  }
];

export default function PackagesPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Travel Packages
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Discover India with our carefully curated travel packages
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{pkg.name}</h3>
                <p className="mt-2 text-gray-500">{pkg.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{pkg.duration}</span>
                  <span className="text-lg font-bold text-indigo-600">{pkg.price}</span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-900">Highlights:</h4>
                  <ul className="mt-2 space-y-1">
                    {pkg.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm text-gray-500 flex items-center">
                        <svg
                          className="h-4 w-4 text-indigo-500 mr-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/contact?package=${pkg.id}`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 