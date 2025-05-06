// components/auth/AdminGate.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAdmin } from '@/lib/utils/is-admin';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (isAdmin()) {
      setAuthorized(true);
    } else {
      router.replace('/admin/login');
    }
  }, []);

  if (!authorized) return null;
  return <>{children}</>;
}
