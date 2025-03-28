import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdminNavigation from './components/AdminNavigation';
import './AdminPage.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h2 className="text-xl font-bold mb-6 px-4">Admin Panel</h2>
          <AdminNavigation />
        </aside>
        <main className="admin-content">
          <div className="content-header">
            <h2>Admin Dashboard</h2>
          </div>
          <div className="main-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}