// lib/firebase/package-service.ts

import { db } from '../firebase-client'
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore/lite'

export interface PackageData {
  id: string
  [key: string]: any
}

// Get all packages
export async function getAllPackages(): Promise<PackageData[]> {
  try {
    const snapshot = await getDocs(collection(db, 'packages'))
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (error) {
    console.error('[GET_ALL_PACKAGES_ERROR]', error)
    return []
  }
}

// Toggle featured status of a single package
export async function toggleFeaturedStatus(id: string, featured: boolean) {
  const packageRef = doc(db, 'packages', id)
  await updateDoc(packageRef, { featured })
  return { success: true }
}

// Toggle featured status for multiple packages
export async function toggleFeaturedStatusBulk(ids: string[], featured: boolean) {
  const updates = ids.map((id) => {
    const ref = doc(db, 'packages', id)
    return updateDoc(ref, { featured })
  })
  await Promise.all(updates)
  return { success: true, updatedCount: ids.length }
}

// Delete a package
export async function deletePackage(id: string) {
  await deleteDoc(doc(db, 'packages', id))
  return { success: true }
}

// Add (or overwrite) a package
export async function addPackage(id: string, data: any) {
  await setDoc(doc(db, 'packages', id), data)
  return { success: true }
}

// Update existing package
export async function updatePackage(id: string, data: any) {
  await updateDoc(doc(db, 'packages', id), data)
  return { success: true }
}
