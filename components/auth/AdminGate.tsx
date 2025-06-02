// components/auth/AdminGate.tsx
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAdmin } from '@/lib/utils/is-admin';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (isAdmin(user)) {
      setIsAuthorized(true);
    } else {
      router.push("/login");
    }
  }, [router]); // ✅ Included router as a dependency

  if (!isAuthorized) return null;
  return <>{children}</>;
}
