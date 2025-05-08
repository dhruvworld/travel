// lib/services/firebase-package.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const collectionName = "packages";

// ✅ Add this function and export it
export async function getFeaturedPackages() {
  const snapshot = await getDocs(collection(db, collectionName));
  const packages = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return packages.filter(pkg => pkg.featured === true);
}
