import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase-client";

const collectionName = "packages";

interface TravelPackage {
  id: string;
  title?: string;
  price?: number;
  description?: string;
  featured?: boolean;
  [key: string]: any; // allow dynamic fields
}

export async function getAllPackages(): Promise<TravelPackage[]> {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as TravelPackage));
}

export async function toggleFeatured(id: string, featured: boolean) {
  const ref = doc(db, collectionName, id);
  await updateDoc(ref, { featured });
}

export async function getFeaturedPackages(): Promise<TravelPackage[]> {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as TravelPackage))
    .filter((pkg) => pkg.featured === true);
}
