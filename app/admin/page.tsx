'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Travel Admin</h1>
        </div>
        <nav className="mt-6">
          {[
            { name: 'Dashboard', icon: '📊' },
            { name: 'Packages', icon: '🎯' },
            { name: 'Hotels', icon: '🏨' },
            { name: 'Bookings', icon: '📅' },
            { name: 'Photos', icon: '📸' },
          ].map((item) => (
            <button
              key={item.name.toLowerCase()}
              onClick={() => setActiveTab(item.name.toLowerCase())}
              className={`w-full flex items-center px-6 py-3 text-left
                ${activeTab === item.name.toLowerCase()
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
          </div>
        </header>

        <main className="p-6">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'packages' && <PackagesContent />}
          {activeTab === 'hotels' && <HotelsContent />}
          {activeTab === 'bookings' && <BookingsContent />}
          {activeTab === 'photos' && <PhotosContent />}
        </main>
      </div>
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: 'Total Bookings', value: '156', change: '+12%', color: 'blue' },
        { title: 'Active Packages', value: '24', change: '+3', color: 'green' },
        { title: 'Total Revenue', value: '₹2.4L', change: '+18%', color: 'purple' },
        { title: 'Active Hotels', value: '12', change: '+2', color: 'orange' },
      ].map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <span className={`ml-2 text-sm font-medium text-${stat.color}-600`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PackagesContent() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Tour Packages</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add New Package
        </button>
      </div>
      <div className="text-gray-600">Packages content coming soon...</div>
    </div>
  );
}

function HotelsContent() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Hotels</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add New Hotel
        </button>
      </div>
      <div className="text-gray-600">Hotels content coming soon...</div>
    </div>
  );
}

function BookingsContent() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium mb-6">Recent Bookings</h3>
      <div className="text-gray-600">Bookings content coming soon...</div>
    </div>
  );
}

function PhotosContent() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Tour Photos</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Upload Photos
        </button>
      </div>
      <div className="text-gray-600">Photos gallery coming soon...</div>
    </div>
  );
} 