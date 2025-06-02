import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-dark to-gray-900 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4 sm:mb-6">
              {/* Text logo instead of image */}
              <span className="text-2xl font-bold text-white">Shubham Tours</span>
            </div>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Your trusted partner for memorable travel experiences across India.
            </p>
            <div className="flex space-x-4 sm:space-x-5 mt-4 sm:mt-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white mt-4 sm:mt-0">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/packages" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/car-rental" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Car Rental
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Hotel Booking
                </Link>
              </li>
              <li>
                <Link href="/custom-tours" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-white mr-0 group-hover:mr-2"></span>
                  Custom Tours
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white mt-4 sm:mt-0">Contact Us</h4>
            <address className="not-italic space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
              <p className="flex items-start">
                <MapPin className="mr-2 sm:mr-3 text-gray-400 mt-1 flex-shrink-0" />
                <span>Yogeshwar Twin Bauglo, 10<br />
                New Ranip, Ahmedabad<br />
                Gujarat 382481, India</span>
              </p>
              <p className="flex items-center mt-2 sm:mt-4">
                <Phone className="mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
                <span>+91 97379 90335</span>
              </p>
              <p className="flex items-center">
                <Mail className="mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
                <span>info@shuhamtours.com</span>
              </p>
              <p className="mt-2 sm:mt-4">Contact Person: Jayendra Patel</p>
            </address>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 sm:mt-10 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Shuham Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
