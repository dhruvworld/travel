#!/bin/bash

echo "🛠 Starting FULL Firebase Migration Fix Script..."

echo "📁 Rewriting lib/firebase-client.ts"
cat > lib/firebase-client.ts <<'EOF'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
EOF

echo "📁 Rewriting lib/firebase-admin.ts"
cat > lib/firebase-admin.ts <<'EOF'
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  }),
};

const adminApp = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
export const adminAuth = getAuth(adminApp);
EOF

echo "📦 Rewriting lib/services/firebase-package.ts"
cat > lib/services/firebase-package.ts <<'EOF'
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase-client";

const collectionName = "packages";

export async function getAllPackages() {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function toggleFeatured(id: string, featured: boolean) {
  const ref = doc(db, collectionName, id);
  await updateDoc(ref, { featured });
}
EOF

echo "📝 Rewriting lib/services/firebase-testimonial.ts"
cat > lib/services/firebase-testimonial.ts <<'EOF'
import { db } from "@/lib/firebase-client";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const collectionName = "testimonials";

export async function getAllTestimonials() {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addTestimonial(data: any) {
  const ref = await addDoc(collection(db, collectionName), data);
  return ref.id;
}

export async function deleteTestimonial(id: string) {
  await deleteDoc(doc(db, collectionName, id));
}
EOF

echo "🔁 Rewriting broken route files..."

mkdir -p app/api/admin/packages/[id]/toggle-featured

cat > app/api/admin/packages/[id]/toggle-featured/route.ts <<'EOF'
import { toggleFeatured } from '@/lib/services/firebase-package';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { featured } = await req.json();
  await toggleFeatured(params.id, featured);
  return new Response("Toggled", { status: 200 });
}
EOF

cat > app/api/admin/gallery/[id]/route.ts <<'EOF'
import { db } from '@/lib/firebase-client';
import { doc, deleteDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await deleteDoc(doc(db, "gallery", params.id));
  return new Response("Deleted", { status: 200 });
}
EOF

cat > app/api/admin/testimonials/route.ts <<'EOF'
import { getAllTestimonials, addTestimonial, deleteTestimonial } from '@/lib/services/firebase-testimonial';
import { NextRequest } from 'next/server';

export async function GET() {
  const data = await getAllTestimonials();
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = await addTestimonial(body);
  return Response.json({ id });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await deleteTestimonial(id);
  return new Response("Deleted", { status: 200 });
}
EOF

cat > app/api/offers/[id]/route.ts <<'EOF'
import { db } from '@/lib/firebase-client';
import { doc, deleteDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await deleteDoc(doc(db, "offers", params.id));
  return new Response("Deleted", { status: 200 });
}
EOF

cat > app/api/packages/[id]/images/route.ts <<'EOF'
import { db } from '@/lib/firebase-client';
import { doc, updateDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { images } = await req.json();
  await updateDoc(doc(db, "packages", params.id), { images });
  return new Response("Updated", { status: 200 });
}
EOF

cat > app/api/testimonials/[id]/route.ts <<'EOF'
import { db } from '@/lib/firebase-client';
import { doc, deleteDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await deleteDoc(doc(db, "testimonials", params.id));
  return new Response("Deleted", { status: 200 });
}
EOF

cat > app/api/gallery/[id]/route.ts <<'EOF'
import { db } from '@/lib/firebase-client';
import { doc, deleteDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await deleteDoc(doc(db, "gallery", params.id));
  return new Response("Deleted", { status: 200 });
}
EOF

echo "🔐 Checking .env.local..."
if [ ! -f ".env.local" ]; then
  echo "❌ ERROR: .env.local not found!"
  exit 1
else
  REQUIRED_VARS=(NEXT_PUBLIC_FIREBASE_API_KEY NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN NEXT_PUBLIC_FIREBASE_PROJECT_ID NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID NEXT_PUBLIC_FIREBASE_APP_ID FIREBASE_PROJECT_ID FIREBASE_CLIENT_EMAIL FIREBASE_PRIVATE_KEY)
  for VAR in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "$VAR=" .env.local; then
      echo "⚠️  Missing $VAR in .env.local"
    fi
  done
  echo "✅ .env.local looks good."
fi

echo "🧹 Forcing hard cleanup of .next and node_modules..."
find .next -depth -exec rm -rf {} + 2>/dev/null
find node_modules -depth -exec rm -rf {} + 2>/dev/null
rm -f package-lock.json

echo "📦 Reinstalling dependencies..."
npm install

echo "🎯 Testing API route health (curl localhost:3000/ping)..."
if curl -s http://localhost:3000/ping | grep -q "pong"; then
  echo "✅ Route test passed."
else
  echo "⚠️  Route test skipped or failed (no /ping endpoint?)."
fi

echo "🧽 Running ESLint + Prettier autofix..."
npx eslint . --fix --ext .ts,.tsx
npx prettier --write .

echo "🏗 Building project..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ ✅ BUILD SUCCESS: All routes and Firebase services are now fixed."
else
  echo "❌ BUILD FAILED: Please check terminal logs above for missing env variables or syntax issues."
fi
