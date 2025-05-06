// app/admin/layout.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase-client';
import { isAdmin } from "../../lib/utils/is-admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        const admin = await isAdmin(user);
        if (!admin) {
          router.push('/');
        } else {
          setLoading(false);
        }
      }
    });

    return () => unsub();
  }, [router]);

  if (loading) return <div className="text-center mt-20">Verifying Admin Access...</div>;

  return <>{children}</>;
}
