import { getServerSession } from 'next-auth/next';  // Corrected import
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';  // Updated path
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

  if (session.user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div>
      <AdminNavigation />
      {children}
    </div>
  );
}
