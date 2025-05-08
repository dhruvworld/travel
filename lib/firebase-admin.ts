// lib/firebase-admin.ts
import admin from "firebase-admin";

// Correctly typed service account object
const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID || "",
  client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || "",
};

// Validate all required fields are present
if (!serviceAccount.project_id || !serviceAccount.client_email || !serviceAccount.private_key) {
  throw new Error("Missing Firebase Admin SDK environment variables.");
}

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const adminAuth = admin.auth();
export const firestore = admin.firestore();
