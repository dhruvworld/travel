const admin = require("firebase-admin");
const serviceAccount = require("./firebase/serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = 'AZ9OHfkkGFcIA56TjMQ3jZQTzPq2'; // 🔁 Replace with your Firebase Auth UID

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ Custom claims set for UID: ${uid}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error setting custom claims:", error);
    process.exit(1);
  });
