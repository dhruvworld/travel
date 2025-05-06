// scripts/create-admin.ts
import admin from 'firebase-admin'
import dotenv from 'dotenv'
dotenv.config()

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
  const email = 'admin@example.com'
  const password = 'admin123'
  const displayName = 'Admin User'

  let userRecord
  try {
    userRecord = await admin.auth().getUserByEmail(email)
    console.log(`✅ Found existing user: UID=${userRecord.uid}`)
  } catch (err: any) {
    if (err.code === 'auth/user-not-found') {
      userRecord = await admin.auth().createUser({
        email,
        password,
        displayName,
      })
      console.log(`✅ Created new user: UID=${userRecord.uid}`)
    } else {
      throw err
    }
  }

  // Set custom claims to mark as admin
  await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'ADMIN' })
  console.log(`🔑 Set custom claim "role: ADMIN" on UID=${userRecord.uid}`)
}

main()
  .then(() => {
    console.log('🎉 Admin setup complete.')
    process.exit(0)
  })
  .catch((e) => {
    console.error('❌ Error in create-admin script:', e)
    process.exit(1)
  })
