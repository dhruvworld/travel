'use client';

import dynamic from "next/dynamic";
import AdminGate from '@/components/auth/AdminGate';

// Dynamically import the Prisma-related component to avoid runtime errors
const AdminPageContent = dynamic(() => import("./AdminPageContent"), { ssr: false });

export default function AdminDashboard() {
  return (
    <AdminGate>
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <AdminPageContent />
      </main>
    </AdminGate>
  );
}