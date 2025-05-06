// lib/services/package-service.ts
import { firestore } from '@/lib/firebase-client';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function getFeaturedPackages() {
  try {
    const q = query(collection(firestore, 'packages'), where('featured', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('[GET_FEATURED_PACKAGES_ERROR]', error);
    return [];
  }
}
