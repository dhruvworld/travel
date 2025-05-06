// lib/services/firebase-package.ts

import { db } from '@/lib/firebase-client'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from 'firebase/firestore/lite'

export interface TravelPackage {
  id: string
  name: string
  slug: string
  duration: number
  price: number
  description: string
  image: string
  highlights: string[]
  featured: boolean
}

// Fetch all packages marked `featured: true`
export async function getFeaturedPackages(): Promise<TravelPackage[]> {
  const colRef = collection(db, 'packages')
  const q = query(colRef, where('featured', '==', true))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<TravelPackage, 'id'>),
  }))
}

// (Optional) other helpers
export async function getAllPackages(): Promise<TravelPackage[]> {
  const colRef = collection(db, 'packages')
  const snap = await getDocs(colRef)
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<TravelPackage, 'id'>),
  }))
}

export async function getPackageById(id: string): Promise<TravelPackage | null> {
  const docRef = doc(db, 'packages', id)
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  return { id: snap.id, ...(snap.data() as Omit<TravelPackage, 'id'>) }
}
