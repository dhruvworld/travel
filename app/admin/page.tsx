import { Suspense } from 'react'
import AdminDashboard from './components/AdminDashboard'
import AdminLoading from './loading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPage() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminDashboard />
    </Suspense>
  )
}