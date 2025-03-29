import React from 'react';
import { useSession } from 'next-auth/react';
import type { User } from '@prisma/client';

interface CustomUser extends User {
  role?: string;
}

export default function AdminPage() {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Your role: {user?.role || 'Guest'}</p>
    </div>
  );
}