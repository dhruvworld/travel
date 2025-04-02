'use client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Stats {
  totalPackages: number;
  activeOffers: number;
  totalBookings: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPackages: 0,
    activeOffers: 0,
    totalBookings: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API calls
    // Mock data for now
    setTimeout(() => {
      setStats({
        totalPackages: 12,
        activeOffers: 3,
        totalBookings: 45,
        revenue: 125000,
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Packages', value: stats.totalPackages, icon: '🏰', color: 'bg-blue-500' },
          { title: 'Active Offers', value: stats.activeOffers, icon: '🎯', color: 'bg-green-500' },
          { title: 'Total Bookings', value: stats.totalBookings, icon: '📋', color: 'bg-purple-500' },
          { title: 'Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: '💰', color: 'bg-yellow-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.color} rounded-xl p-6 text-white`}
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { id: '1', type: 'booking', package: 'Taj Mahal Tour', customer: 'John Doe', date: '2024-04-15' },
            { id: '2', type: 'offer', name: 'Summer Special', discount: '15%', date: '2024-04-12' },
            { id: '3', type: 'package', name: 'Kerala Backwaters', status: 'Active', date: '2024-04-10' },
          ].map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  {activity.type === 'booking' ? '👤' : activity.type === 'offer' ? '🎯' : '🏰'}
                </div>
                <div>
                  <p className="font-semibold">
                    {activity.type === 'booking'
                      ? `New booking received`
                      : activity.type === 'offer'
                      ? `New offer created`
                      : `Package updated`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.type === 'booking'
                      ? activity.package
                      : activity.type === 'offer'
                      ? `${activity.name} (${activity.discount} off)`
                      : activity.name}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}