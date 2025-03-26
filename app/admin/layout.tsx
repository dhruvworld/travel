import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdminNavigation from './components/AdminNavigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          <AdminNavigation />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <header className="bg-white shadow">
            <div className="px-4 py-6">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
} 