import AdminDashboard from './components/AdminDashboard'
import { Suspense } from 'react'

export default async function AdminPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <AdminDashboard />
    </Suspense>
  )
}