// lib/firebase/image-service.ts

import { db } from '../firebase-client'
import { collection, addDoc } from 'firebase/firestore/lite'

interface ImageData {
  cloudId: string
  url: string
  alt?: string
}

export async function saveImage(data: ImageData) {
  const docRef = await addDoc(
    collection(db, 'images'),
    {
      ...data,
      createdAt: new Date(),   // JS Date will be stored as Firestore Timestamp
    }
  )
  return { id: docRef.id }
}
