export const dynamic = 'force-dynamic';

export default function PackagesPage() {
  return (
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Travel Packages</h1>
      <p className="text-xl text-gray-600 text-center mb-16">
        Discover our carefully curated travel experiences across India
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder for package cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 relative"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Package Title</h3>
              <p className="text-gray-600 mb-4">
                Short description of this amazing travel package with highlights and key features.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">₹XX,XXX</span>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}