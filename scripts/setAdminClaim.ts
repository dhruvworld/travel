// scripts/setAdminClaim.ts
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './serviceAccountKey.json'; // download from Firebase

initializeApp({
  credential: cert(serviceAccount),
});

async function setAdmin(uid: string) {
  try {
    await getAuth().setCustomUserClaims(uid, { admin: true });
    console.log(`✅ Admin claim set for user: ${uid}`);
    console.log(
      `ℹ️ Verify in Firebase Console: Go to Authentication > Users > Select User > Custom Claims`
    );
  } catch (err) {
    console.error('❌ Failed to set claim:', err);
  }
}

// Replace with actual UID from Firebase console
setAdmin('AZ9OHfkkGFcIA56TjMQ3jZQTzPq2');
