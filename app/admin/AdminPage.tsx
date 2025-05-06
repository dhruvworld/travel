'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (!session) {
    router.push('/admin/login');
    return null;
  }

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Panel</h1>
      <p className="text-lg text-gray-700">Manage your application content here.</p>
    </main>
  );
}
