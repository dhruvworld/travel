import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <Image
            className="w-full h-full object-cover"
            src="/images/about-hero.jpg"
            alt="About Shuham Tours & Travels"
            width={1920}
            height={600}
            priority
          />
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Shuham Tours & Travels
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Your trusted partner for premium car rentals and travel services in Ahmedabad. We provide comfortable, reliable, and affordable transportation solutions for all your travel needs.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Shuham Tours & Travels, based in Ahmedabad, Gujarat, has been at the forefront of providing 
              exceptional car rental services and travel solutions. Our journey began with a simple mission: 
              to make travel comfortable and hassle-free for our clients. Today, we are proud to be one of 
              the most trusted names in the travel industry in Ahmedabad.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Our mission is to provide exceptional travel experiences that:
            </p>
            <ul>
              <li>Deliver reliable and comfortable car rental services</li>
              <li>Ensure safe and punctual transportation</li>
              <li>Offer competitive pricing and excellent value</li>
              <li>Provide personalized service to meet individual needs</li>
              <li>Maintain the highest standards of vehicle maintenance and safety</li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fleet of Modern Vehicles</h3>
              <p className="text-gray-600">
                Our well-maintained fleet includes a variety of vehicles to suit your needs, from luxury cars to comfortable SUVs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Drivers</h3>
              <p className="text-gray-600">
                Our experienced and courteous drivers ensure safe and comfortable journeys throughout your trip.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support to assist you with any queries or requirements during your journey.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Car Rental Services</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Airport pick-up and drop-off</li>
                <li>Corporate travel solutions</li>
                <li>Wedding and special event transportation</li>
                <li>Outstation travel services</li>
                <li>Long-term rental options</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Services</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Travel planning assistance</li>
                <li>Hotel booking support</li>
                <li>Tour package arrangements</li>
                <li>Corporate event transportation</li>
                <li>Custom travel solutions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Visit Us</h3>
              <p className="text-gray-600">
                Yogeshwar Twin Bauglo, 10<br />
                New Ranip, Ahmedabad<br />
                Gujarat 382481, India
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-600">
                Jayendra Patel<br />
                Phone: +91 97379 90335<br />
                Alt. Phone: +91 63519 40406<br />
                <br />
                Email: info@shuhamtours.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}