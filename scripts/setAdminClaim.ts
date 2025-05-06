// scripts/setAdminClaim.ts

import admin from 'firebase-admin'
import 'dotenv/config'

// Initialize the Admin SDK once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  })
}

async function main() {
  const uid = process.argv[2]
  if (!uid) {
    console.error('❌ Please provide the user UID as the first argument.')
    process.exit(1)
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { role: 'ADMIN' })
    console.log(`✅ Set "role: ADMIN" claim on user ${uid}`)
    process.exit(0)
  } catch (err) {
    console.error('❌ Failed to set custom claim:', err)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}
