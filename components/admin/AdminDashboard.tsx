'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (status === 'loading') return;
    
    if (status === 'unauthenticated' || !session?.user?.isAdmin) {
      router.push('/admin/login');
      return;
    }
    
    setLoading(false);
  }, [router, session, status]);

  if (loading) {
    return <div className="text-center py-6">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <p className="text-gray-600">No recent bookings found.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <p className="text-gray-600">No analytics data available.</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Content Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/admin/home"
            className="block p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            <h3 className="font-medium text-indigo-700">Home Page</h3>
            <p className="text-sm text-gray-600 mt-1">Edit homepage content</p>
          </Link>
          
          {/* Add more content management links here */}
        </div>
      </div>
    </div>
  );
}
