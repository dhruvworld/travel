#!/bin/bash

echo "🧼 Cleaning up next-auth integration..."

# 1. Uninstall next-auth
echo "📦 Uninstalling next-auth..."
npm uninstall next-auth

# 2. Delete all known files using next-auth
echo "🗑️ Deleting unused auth files..."
rm -f ./app/providers.tsx
rm -f ./app/auth/debug/page.tsx
rm -f ./app/auth/signin/SignInForm.tsx

# 3. Search for remaining 'next-auth' imports
echo "🔍 Searching for leftover 'next-auth' imports..."
grep -rl "next-auth" ./app ./lib

# 4. Delete .next cache
echo "🗑️ Removing .next cache..."
rm -rf .next

# 5. Optionally regenerate clean Providers file
echo "📄 Recreating ./app/providers.tsx..."
cat <<EOF > ./app/providers.tsx
'use client';
import { ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function Providers({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => setLoading(false));
    return () => unsub();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return <>{children}</>;
}
EOF

# 6. Final build
echo "🚧 Rebuilding project..."
npm run build

echo "✅ Cleanup complete!"
