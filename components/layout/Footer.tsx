import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShubhamTours</h3>
            <p className="text-gray-300">
              Your trusted partner for memorable travel experiences across India.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-300 hover:text-white transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-300 hover:text-white transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tours" className="text-gray-300 hover:text-white transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/car-rental" className="text-gray-300 hover:text-white transition-colors">
                  Car Rental
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-gray-300 hover:text-white transition-colors">
                  Hotel Booking
                </Link>
              </li>
              <li>
                <Link href="/custom-tours" className="text-gray-300 hover:text-white transition-colors">
                  Custom Tours
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-300">
              <p>Yogeshwar Twin Bauglo, 10</p>
              <p>New Ranip, Ahmedabad</p>
              <p>Gujarat 382481, India</p>
              <p className="mt-2">Phone: +91 97379 90335</p>
              <p>Email: info@shuhamtours.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ShubhamTours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
