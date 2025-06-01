'use client';

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null; // Remove optional since layout always provides it
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
