'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Add your auth check here
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        if (!response.ok) {
          router.push('/login')
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login')
      }
    }
    
    checkAuth()
  }, [router])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {/* Add your admin components here */}
    </div>
  )
}
