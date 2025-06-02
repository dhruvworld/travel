import React from 'react';
<<<<<<< HEAD
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function AdminPage() {
  const { data: session } = useSession() as { data: Session | null };

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Your role: {session?.user?.role || 'Guest'}</p>
=======

export default function AdminPage() {
  return (
    <div>
      <h1>Welcome, Admin</h1>
      <p>Your role: Admin</p>
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    </div>
  );
}
