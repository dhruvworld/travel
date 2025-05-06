// scripts/updateFeaturedPackages.ts

import admin from 'firebase-admin'
import dayjs from 'dayjs'
import 'dotenv/config'

// Initialize the Admin SDK once (uses your FIREBASE_* env vars)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  })
}

const db = admin.firestore()
const PACKAGES_PER_HOUR = 3

async function main() {
  const now = dayjs()
  const hour = now.hour()

  // 1) Fetch all published & active packages, ordered by createdAt ascending
  const snapshot = await db
    .collection('packages')
    .where('published', '==', true)
    .where('isActive', '==', true)
    .orderBy('createdAt', 'asc')
    .get()

  const docs = snapshot.docs
  const total = docs.length
  if (total === 0) {
    console.warn('⚠️ No published active packages to feature.')
    return
  }

  // 2) Compute which slice to feature this hour
  const startIndex = (hour * PACKAGES_PER_HOUR) % total
  // handle wrap-around slicing
  const featuredDocs =
    startIndex + PACKAGES_PER_HOUR <= total
      ? docs.slice(startIndex, startIndex + PACKAGES_PER_HOUR)
      : [
          ...docs.slice(startIndex, total),
          ...docs.slice(0, (startIndex + PACKAGES_PER_HOUR) % total),
        ]

  // 3) Create a batch: reset all to featured=false, then set selected to featured=true
  const batch = db.batch()
  docs.forEach((docSnap) => {
    batch.update(docSnap.ref, { featured: false })
  })
  featuredDocs.forEach((docSnap) => {
    batch.update(docSnap.ref, { featured: true })
  })
  await batch.commit()

  console.log(
    `✅ Rotated featured packages at ${hour}:00 — showing packages ${startIndex +
      1} to ${startIndex + PACKAGES_PER_HOUR}.`
  )
}

main().catch((err) => {
  console.error('❌ Error rotating featured packages:', err)
  process.exit(1)
})
