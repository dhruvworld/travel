'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Client-side redirect to admin login
    router.replace('/admin/login');
  }, [router]);
  
  // Return a loading state while redirecting
  return <div className="text-center py-12">Redirecting to admin login...</div>;
}
