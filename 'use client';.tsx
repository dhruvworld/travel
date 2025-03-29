'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: ReactNode;
  session?: Session | null;
}

interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  expires: string;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
