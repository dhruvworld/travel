"use client";

import Link from 'next/link';
import { 
  Package, 
  MessageSquare, 
  Image as ImageIcon, 
  Car,
  Building2,
  Globe,
  Tag,
} from 'lucide-react';

export default function AdminDashboard() {
  // Define dashboard cards with icons, titles, and descriptions
  const dashboardCards = [
    { 
      title: 'Featured Packages', 
      description: 'Manage packages shown on homepage',
      href: '/admin/featured-packages', 
      icon: <Package size={24} className="text-indigo-600" />,
      color: 'bg-indigo-50'
    },
    { 
      title: 'Testimonials', 
      description: 'Customer reviews and feedback',
      href: '/admin/testimonials', 
      icon: <MessageSquare size={24} className="text-green-600" />,
      color: 'bg-green-50'
    },
    { 
      title: 'Travel Gallery', 
      description: 'Manage website image gallery',
      href: '/admin/gallery', 
      icon: <ImageIcon size={24} className="text-amber-600" />,
      color: 'bg-amber-50'
    },
    { 
      title: 'Tour Packages', 
      description: 'Manage all tour packages',
      href: '/admin/tours', 
      icon: <Globe size={24} className="text-blue-600" />,
      color: 'bg-blue-50'
    },
    { 
      title: 'Hotels', 
      description: 'Hotel listings and bookings',
      href: '/admin/hotels', 
      icon: <Building2 size={24} className="text-purple-600" />,
      color: 'bg-purple-50'
    },
    { 
      title: 'Car Rentals', 
      description: 'Vehicle rentals and services',
      href: '/admin/car-rentals', 
      icon: <Car size={24} className="text-red-600" />,
      color: 'bg-red-50'
    },
    { 
      title: 'Special Offers', 
      description: 'Discounts and promotions',
      href: '/admin/offers', 
      icon: <Tag size={24} className="text-teal-600" />,
      color: 'bg-teal-50'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">📊 Admin Dashboard</h1>
        <p className="text-gray-500">Manage your travel website content and settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

function DashboardCard({ 
  title, 
  description, 
  href, 
  icon, 
  color 
}: { 
  title: string; 
  description: string;
  href: string; 
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all hover:translate-y-[-2px]"
    >
      <div className="p-6">
        <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${color}`}>
          {icon}
        </div>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </Link>
  );
}
