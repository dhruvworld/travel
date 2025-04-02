// app/admin/layout.tsx
import { ReactNode } from 'react';
import { requireAuth } from '@/lib/session';  // Use our new utility
import { redirect } from 'next/navigation';

// Force dynamic rendering for admin layout
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Use our requireAuth utility
  await requireAuth('/admin');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {children}
      </div>
    </div>
  );
}
