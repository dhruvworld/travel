import React from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function AdminPage() {
  const { data: session } = useSession() as { data: Session | null };

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Your role: {session?.user?.role || 'Guest'}</p>
    </div>
  );
}
