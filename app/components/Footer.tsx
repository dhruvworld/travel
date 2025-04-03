import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Shuham Travel</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for memorable travel experiences across India.
            </p>
            <div className="flex space-x-5 mt-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={22} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={22} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/tours" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/car-rental" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Car Rental
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Hotel Booking
                </Link>
              </li>
              <li>
                <Link href="/custom-tours" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Custom Tours
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <address className="not-italic space-y-3 text-gray-300">
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-gray-400" />
                <span>Yogeshwar Twin Bauglo, 10<br />
                New Ranip, Ahmedabad<br />
                Gujarat 382481, India</span>
              </p>
              <p className="flex items-center mt-4">
                <FaPhone className="mr-3 text-gray-400" />
                <span>+91 97379 90335</span>
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-3 text-gray-400" />
                <span>info@shuhamtours.com</span>
              </p>
              <p className="mt-4">Contact Person: Jayendra Patel</p>
            </address>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Shuham Tours & Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}