
#!/bin/bash

echo "🛠 Fixing Firebase migration issues..."

# 1. Remove old Prisma & NextAuth files
echo "🧹 Cleaning up unused files..."
rm -f lib/db.ts
rm -f lib/auth-options.ts

# 2. Recreate Firebase client config
echo "📦 Recreating Firebase client config at lib/firebase-client.ts..."
mkdir -p lib
cat <<EOF > lib/firebase-client.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
EOF

# 3. Recreate testimonial service
echo "📄 Rewriting testimonial service at lib/services/firebase-testimonial.ts..."
mkdir -p lib/services
cat <<EOF > lib/services/firebase-testimonial.ts
import { db } from "@/lib/firebase-client";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const TESTIMONIALS = "testimonials";

export async function getTestimonials() {
  const snapshot = await getDocs(collection(db, TESTIMONIALS));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addTestimonial(data: any) {
  const docRef = await addDoc(collection(db, TESTIMONIALS), data);
  return { id: docRef.id, ...data };
}

export async function deleteTestimonial(id: string) {
  await deleteDoc(doc(db, TESTIMONIALS, id));
}
EOF

# 4. Recreate app/providers.tsx
echo "⚙️ Rewriting app/providers.tsx..."
mkdir -p app
cat <<EOF > app/providers.tsx
"use client";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  );
}
EOF

# 5. Fix imports in all route files
echo "🔧 Fixing broken imports in API routes..."
find app/api -name "*.ts" -type f -exec sed -i '' 's|@/lib/auth-options|@/lib/utils/verify-admin|g' {} +
find app/api -name "*.ts" -type f -exec sed -i '' 's|@/lib/db|@/lib/firebase-client|g' {} +
find app/api -name "*.ts" -type f -exec sed -i '' 's|../../../lib/services/firebase-testimonial|@/lib/services/firebase-testimonial|g' {} +

# 6. Optional: Fix tsconfig.json if alias is missing
if ! grep -q '"@/lib/*"' tsconfig.json; then
  echo "📁 Adding path alias to tsconfig.json..."
  sed -i '' '/"compilerOptions": {/a\
    "baseUrl": ".",\
    "paths": { "@/*": ["./*"] },
  ' tsconfig.json
fi

# 7. Install missing types
echo "📦 Installing required types..."
npm install --save-dev @types/react @types/node

# 8. Install core postcss deps if needed
echo "🔌 Ensuring postcss/autoprefixer are installed..."
npm install --save-dev postcss autoprefixer

# 9. Done
echo "✅ Firebase migration cleanup complete. Now run: npm run build"
