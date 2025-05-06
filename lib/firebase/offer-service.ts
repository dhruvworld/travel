// lib/firebase/offer-service.ts

import { db } from '@/lib/firebase-client'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore/lite'

export interface Offer {
  id: string
  title: string
  description: string
  price: number
  featured?: boolean
}

// Reference to the “offers” collection
const offersCol = collection(db, 'offers')

// Fetch all offers
export async function getOffers(): Promise<Offer[]> {
  const snap = await getDocs(offersCol)
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Offer, 'id'>) }))
}

// Add a new offer
export async function addOffer(data: Omit<Offer, 'id'>): Promise<Offer> {
  const ref = await addDoc(offersCol, data)
  return { id: ref.id, ...data }
}

// Update an existing offer by ID
export async function updateOffer(id: string, data: Partial<Omit<Offer, 'id'>>): Promise<void> {
  const ref = doc(db, 'offers', id)
  await updateDoc(ref, data)
}

// Delete an offer by ID
export async function deleteOffer(id: string): Promise<void> {
  const ref = doc(db, 'offers', id)
  await deleteDoc(ref)
}
