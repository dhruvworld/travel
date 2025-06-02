'use client';

import { ReactNode } from 'react';
<<<<<<< HEAD
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface ProvidersProps {
  children: ReactNode;
  session?: Session | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
=======

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <>{children}</>;
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
}
