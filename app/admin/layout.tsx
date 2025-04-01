// app/admin/layout.tsx
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions, requireAuth } from '../../lib/auth';
import AdminNavigation from './components/AdminNavigation';
import './AdminPage.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Add your own role check here if role is available in session
  // if (session.user.role !== 'admin') redirect('/');

  return (
    <div>
      <AdminNavigation />
      {children}
    </div>
  );
}
