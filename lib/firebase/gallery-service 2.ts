// lib/firebase/gallery-service.ts

import { db } from '../firebase-client'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore/lite'

// Add a new image to the gallery
export async function addGalleryImage(data: {
  url: string
  alt: string
  createdAt?: Date
}) {
  await addDoc(collection(db, 'gallery'), {
    ...data,
    createdAt: data.createdAt || new Date(),
  })
  return { success: true }
}

// Get all gallery images
export async function getGalleryImages() {
  const snapshot = await getDocs(collection(db, 'gallery'))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// Delete a gallery image by ID
export async function deleteGalleryImageById(id: string) {
  await deleteDoc(doc(db, 'gallery', id))
  return { success: true }
}
