import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-cover bg-center">
        <Image
          src="/hero/hero-main.jpg"
          alt="Discover India"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover India with Shubham Tours
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience the magic of incredible India
          </p>
          <div className="flex gap-4">
            <Link 
              href="/packages"
              className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Packages
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-4 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 text-lg">
              Comprehensive travel solutions for your perfect Indian adventure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: "🏰",
                title: "Tour Packages",
                description: "Curated experiences across India's finest destinations",
                href: "/tours"
              },
              {
                icon: "🚗",
                title: "Car Rental",
                description: "Comfortable and reliable transportation services",
                href: "/car-rental"
              },
              {
                icon: "🏨",
                title: "Hotel Booking",
                description: "Handpicked accommodations for every budget",
                href: "/hotels"
              },
              {
                icon: "✨",
                title: "Custom Tours",
                description: "Personalized itineraries tailored to your preferences",
                href: "/custom-tours"
              }
            ].map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="p-8 rounded-xl shadow-lg hover:shadow-xl 
                           transition-all duration-300 transform hover:-translate-y-1
                           bg-white border border-gray-100 cursor-pointer"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Top Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Golden Triangle Tour",
                image: "/destinations/golden-triangle.jpg",
                price: "From ₹29,999",
                duration: "6 Days",
                description: "Delhi, Agra, and Jaipur in 6 days"
              },
              {
                title: "Kerala Backwaters",
                image: "/destinations/kerala.jpg",
                price: "From ₹24,999",
                duration: "5 Days",
                description: "Explore God's own country"
              },
              {
                title: "Varanasi Spiritual Tour",
                image: "/destinations/varanasi.jpg",
                price: "From ₹19,999",
                duration: "4 Days",
                description: "Sacred journey along the Ganges"
              }
            ].map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-600 font-semibold">{pkg.price}</span>
                    <button className="text-primary-600 hover:text-primary-700 font-semibold">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Our Travelers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya R.",
                text: "Amazing service, great prices! The team made our trip unforgettable.",
                location: "Mumbai",
                rating: 5
              },
              {
                name: "Rahul S.",
                text: "Professional service and well-planned itinerary. Highly recommended!",
                location: "Delhi",
                rating: 5
              },
              {
                name: "Amit P.",
                text: "Best travel experience ever. Will definitely book again!",
                location: "Bangalore",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">&quot;{testimonial.text}&quot;</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Travel Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                src: "/gallery/gallery-1.jpg",
                alt: "Taj Mahal at sunrise",
                caption: "Taj Mahal, Agra"
              },
              {
                src: "/gallery/gallery-2.jpg",
                alt: "Kerala backwaters",
                caption: "Backwaters, Kerala"
              },
              {
                src: "/gallery/gallery-3.jpg",
                alt: "Varanasi Ghats",
                caption: "Ghats of Varanasi"
              },
              {
                src: "/gallery/gallery-4.jpg",
                alt: "Jaipur City Palace",
                caption: "City Palace, Jaipur"
              },
              {
                src: "/gallery/gallery-5.jpg",
                alt: "Goa Beaches",
                caption: "Beaches of Goa"
              },
              {
                src: "/gallery/gallery-6.jpg",
                alt: "Himalayas",
                caption: "Himalayan Mountains"
              },
              {
                src: "/gallery/gallery-7.jpg",
                alt: "Delhi Red Fort",
                caption: "Red Fort, Delhi"
              },
              {
                src: "/gallery/gallery-8.jpg",
                alt: "Udaipur Palace",
                caption: "City Palace, Udaipur"
              }
            ].map((image, index) => (
              <div 
                key={index} 
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 text-sm">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Plan Your Trip
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
