import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, doc } from "firebase/firestore";

const {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
} = process.env;

if (
  !NEXT_PUBLIC_FIREBASE_API_KEY ||
  !NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  !NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  !NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  !NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
  !NEXT_PUBLIC_FIREBASE_APP_ID
) {
  console.error("❌ Missing Firebase environment variables. Please check your .env.local file.");
  process.exit(1);
}

const firebaseConfig = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("⚙️ Initializing Firebase...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const samplePackages = [
  {
    name: "Golden Triangle Tour",
    slug: "golden-triangle-tour",
    duration: "5 Days",
    price: 25000,
    description: "Explore Delhi, Agra, and Jaipur with guided tours.",
    image: "https://source.unsplash.com/random/800x600?india",
    highlights: ["Taj Mahal", "Jaipur Fort", "India Gate"],
    featured: false,
  },
  {
    name: "Goa Beach Getaway",
    slug: "goa-beach-getaway",
    duration: "4 Days",
    price: 18000,
    description: "Relax at the pristine beaches of Goa.",
    image: "https://source.unsplash.com/random/800x600?beach",
    highlights: ["Baga Beach", "Fort Aguada", "Sunburn Festival"],
    featured: false,
  },
  {
    name: "Himalayan Adventure",
    slug: "himalayan-adventure",
    duration: "6 Days",
    price: 30000,
    description: "Trek through the Himalayan mountains and valleys.",
    image: "https://source.unsplash.com/random/800x600?mountains",
    highlights: ["Manali", "Rohtang Pass", "Camping"],
    featured: false,
  },
];

async function checkConnection() {
  try {
    console.log("🔍 Checking Firestore connection...");
    const testRef = doc(db, "connection_check", "test_doc");
    await getDoc(testRef); // harmless read to test
    console.log("✅ Firestore connection verified.");
    return true;
  } catch (error) {
    console.error("❌ Firestore connection failed:", error.message);
    return false;
  }
}

async function seedPackages() {
  const isConnected = await checkConnection();
  if (!isConnected) {
    console.error("🚫 Aborting seeding due to Firestore permission issues.");
    process.exit(1);
  }

  try {
    const ref = collection(db, "packages");
    for (const pkg of samplePackages) {
      await addDoc(ref, pkg);
      console.log(`✅ Added package: ${pkg.name}`);
    }
    console.log("🌱 Seeding complete.");
  } catch (error) {
    console.error("❌ Failed to seed packages:", error);
  }
}

seedPackages();
