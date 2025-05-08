// lib/firebase-admin.ts

import admin from "firebase-admin";

// Only initialize Firebase if running on Firebase Hosting
if (process.env.NETLIFY === undefined) {
  if (!admin.apps.length) {
    const serviceAccount = {
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }
}

export const adminAuth = admin.apps.length ? admin.auth() : null;
export const firestore = admin.apps.length ? admin.firestore() : null;
