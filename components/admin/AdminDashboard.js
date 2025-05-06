'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminDashboard;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var react_2 = require("next-auth/react");
var link_1 = require("next/link");
function AdminDashboard() {
    var router = (0, navigation_1.useRouter)();
    var _a = (0, react_2.useSession)(), session = _a.data, status = _a.status;
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        var _a;
        // Check authentication
        if (status === 'loading')
            return;
        if (status === 'unauthenticated' || !((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
            router.push('/admin/login');
            return;
        }
        setLoading(false);
    }, [router, session, status]);
    if (loading) {
        return <div className="text-center py-6">Loading dashboard...</div>;
    }
    return (<div className="admin-dashboard">
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
          <link_1.default href="/admin/home" className="block p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            <h3 className="font-medium text-indigo-700">Home Page</h3>
            <p className="text-sm text-gray-600 mt-1">Edit homepage content</p>
          </link_1.default>
          
          {/* Add more content management links here */}
        </div>
      </div>
    </div>);
}
