// lib/firebase/home-service.ts

import { db } from '../firebase-client'
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore/lite'

const HOME_DOC_ID = 'content' // Fixed ID for singleton document

// Update homepage content
export async function updateHomeContent(data: {
  title?: string
  subtitle?: string
  heroText?: string
  heroImage?: string
}) {
  const ref = doc(db, 'homeContent', HOME_DOC_ID)
  await setDoc(ref, data, { merge: true })
  return { success: true }
}

// Fetch homepage content
export async function getHomeContent() {
  const ref = doc(db, 'homeContent', HOME_DOC_ID)
  const snapshot = await getDoc(ref)
  if (snapshot.exists()) {
    return snapshot.data()
  }
  return null
}
