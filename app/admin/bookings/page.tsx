'use client';

import { useState, useEffect } from 'react';

interface Booking {
  id: string;
  packageName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  persons: number;
  totalAmount: number;
  status: 'pending';
  notes: string;
}

type SortField = 'date' | 'packageName' | 'customerName' | 'totalAmount';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder] = useState('desc');
  const [selectedPackage, setSelectedPackage] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    // Simulated API call
    const fetchBookings = async () => {
      try {
        // TODO: Replace with actual API call
        const mockBookings: Booking[] = [
          {
            id: '1',
            packageName: 'Taj Mahal Tour',
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            customerPhone: '+91 98765 43210',
            date: '2024-04-15',
            persons: 2,
            totalAmount: 5998,
            status: 'pending',
            notes: 'Need airport pickup',
          },
          {
            id: '2',
            packageName: 'Jaipur Palace Tour',
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            customerPhone: '+91 98765 43211',
            date: '2024-04-20',
            persons: 3,
            totalAmount: 11997,
            status: 'pending',
            notes: 'Vegetarian meals required',
          },
          {
            id: '3',
            packageName: 'Kerala Backwaters',
            customerName: 'Mike Johnson',
            customerEmail: 'mike@example.com',
            customerPhone: '+91 98765 43212',
            date: '2024-05-01',
            persons: 4,
            totalAmount: 19996,
            status: 'pending',
            notes: 'Interested in houseboat stay',
          },
        ];
        setBookings(mockBookings);
        setFilteredBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Get unique package names for filter
  const packageNames = Array.from(new Set(bookings.map(booking => booking.packageName)));

  // Filter and sort bookings
  useEffect(() => {
    let filtered = [...bookings];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.packageName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply package filter
    if (selectedPackage !== 'all') {
      filtered = filtered.filter(booking => booking.packageName === selectedPackage);
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate >= new Date(dateRange.start) && bookingDate <= new Date(dateRange.end);
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, selectedPackage, dateRange, sortField, sortOrder]);

  const handleViewClick = (booking: Booking) => {
    setCurrentBooking(booking);
    setShowModal(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['Enquiry ID', 'Package', 'Customer Name', 'Email', 'Phone', 'Date', 'Persons', 'Amount', 'Notes'],
      ...filteredBookings.map(booking => [
        booking.id,
        booking.packageName,
        booking.customerName,
        booking.customerEmail,
        booking.customerPhone,
        formatDate(booking.date),
        booking.persons,
        booking.totalAmount,
        booking.notes
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `booking-enquiries-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Booking Enquiries</h1>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or package..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Package</label>
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Packages</option>
              {packageNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="packageName">Package</option>
              <option value="customerName">Customer Name</option>
              <option value="totalAmount">Amount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enquiry ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Travel Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Persons
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">#{booking.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.packageName}</div>
                  <div className="text-sm text-gray-500">₹{booking.totalAmount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.customerName}</div>
                  <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                  <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(booking.date)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.persons}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewClick(booking)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Viewing Booking Details */}
      {showModal && currentBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Enquiry Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Enquiry ID</label>
                  <p className="mt-1 text-sm text-gray-900">#{currentBooking.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Package</label>
                  <p className="mt-1 text-sm text-gray-900">{currentBooking.packageName}</p>
                  <p className="mt-1 text-sm text-gray-500">₹{currentBooking.totalAmount}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                  <p className="mt-1 text-sm text-gray-900">{currentBooking.customerName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Details</label>
                  <p className="mt-1 text-sm text-gray-900">{currentBooking.customerEmail}</p>
                  <p className="mt-1 text-sm text-gray-900">{currentBooking.customerPhone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Travel Date</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(currentBooking.date)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Persons</label>
                  <p className="mt-1 text-sm text-gray-900">{currentBooking.persons}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                  <p className="mt-1 text-sm text-gray-900">{currentBooking.notes}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}