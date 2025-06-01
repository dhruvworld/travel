import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-7xl font-bold mb-4 text-gray-900">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
