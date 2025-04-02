import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Optional safety check - redirect to correct path if not authenticated
  if (!session?.user?.isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className="admin-dashboard-page px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, Admin 👋</h1>
      <AdminDashboard />
    </div>
  );
}
