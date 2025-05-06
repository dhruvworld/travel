// scripts/seed-packages.ts

import { db } from '../lib/firebase-client'
import { collection, addDoc } from 'firebase/firestore/lite'
import rawData from 'package-lock.json'  // adjust path if necessary

// Ensure we have an array to iterate:
const packagesData: any[] = Array.isArray(rawData)
  ? rawData
  : Object.values(rawData)

async function seedPackages(): Promise<boolean> {
  const colRef = collection(db, 'packages')
  try {
    for (const pkg of packagesData) {
      await addDoc(colRef, pkg)
      console.log(`✅ Seeded package: ${pkg.name ?? pkg.id}`)
    }
    console.log('🎉 All packages seeded successfully.')
    return true
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Firestore connection failed:', error.message)
    } else {
      console.error('❌ Firestore connection failed:', error)
    }
    return false
  }
}

seedPackages()
  .then((ok) => process.exit(ok ? 0 : 1))
  .catch((e) => {
    console.error('❌ Unexpected error during seeding:', e)
    process.exit(1)
  })
