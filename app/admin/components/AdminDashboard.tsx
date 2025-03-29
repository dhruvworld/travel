'use client'

import { useRouter, usePathname } from 'next/navigation'
import '../AdminPage.css'

// ...existing MENU_ITEMS code...

export default function AdminDashboard() {
  const router = useRouter()
  const pathname = usePathname()
  
  // ...existing component code without Suspense wrapper...
}
