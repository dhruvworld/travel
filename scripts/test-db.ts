// scripts/test-db.ts

import { collection, getDocs } from 'firebase/firestore/lite'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import your Firestore client from the correct path
import { db } from '../lib/firebase/firebase-client'

/**
 * Simple script to verify your Firestore connection.
 * It fetches all documents in the "packages" collection
 * and logs the count.
 */
async function main(): Promise<void> {
  try {
    console.log('🔌 Testing Firestore connection…')
    const snapshot = await getDocs(collection(db, 'packages'))
    console.log(
      `✅ Firestore connection successful! Found ${snapshot.docs.length} document(s) in "packages".`
    )
    process.exit(0)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Firestore connection failed:', error.message)
    } else {
      console.error('❌ Firestore connection failed:', error)
    }
    process.exit(1)
  }
}

main().catch((e) => {
  console.error('❌ Unexpected error during Firestore test:', e)
  process.exit(1)
})
