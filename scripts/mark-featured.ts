import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

// 🔐 Load env vars from .env.local
const {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
} = process.env;

if (
  !NEXT_PUBLIC_FIREBASE_API_KEY ||
  !NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  !NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  !NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  !NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
  !NEXT_PUBLIC_FIREBASE_APP_ID
) {
  console.error("❌ Firebase environment variables are missing. Please check your .env.local file.");
  process.exit(1);
}

// ✅ Firebase config
const firebaseConfig = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("📦 Starting Firebase featured mark script...");

async function markFeaturedPackages() {
  try {
    const packagesRef = collection(db, "packages");
    const snapshot = await getDocs(packagesRef);
    const docs = snapshot.docs;

    if (docs.length === 0) {
      console.warn("⚠️ No packages found in Firestore.");
      return;
    }

    const featuredLimit = 3;
    for (let i = 0; i < docs.length; i++) {
      const pkgDoc = docs[i];
      const isFeatured = i < featuredLimit;
      await updateDoc(doc(db, "packages", pkgDoc.id), {
        featured: isFeatured,
      });
      console.log(`🔁 Package ${pkgDoc.id} marked as ${isFeatured ? "featured" : "not featured"}`);
    }

    console.log("✅ Successfully updated featured packages!");
  } catch (error) {
    console.error("❌ Error marking featured packages:", error);
  }
}

markFeaturedPackages();
