import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('⚙️ Initializing Firebase...');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const testimonials = [
  {
    name: 'Ravi Kumar',
    feedback: 'Amazing experience, very smooth and memorable!',
    location: 'Delhi',
  },
  {
    name: 'Pooja Mehta',
    feedback: 'The best tour service ever. Highly recommended!',
    location: 'Mumbai',
  },
];

const gallery = [
  {
    imageUrl: 'https://source.unsplash.com/random/800x600?travel1',
    caption: 'Beautiful Sunrise in Goa',
  },
  {
    imageUrl: 'https://source.unsplash.com/random/800x600?travel2',
    caption: 'Historic Monuments of Jaipur',
  },
];

async function seedCollection(name: string, data: any[]) {
  const ref = collection(db, name);
  const existing = await getDocs(ref);
  if (!existing.empty) {
    console.log(`ℹ️ Collection "${name}" already has data. Skipping...`);
    return;
  }

  for (const item of data) {
    await addDoc(ref, item);
    console.log(`✅ Added to "${name}": ${item.caption || item.name}`);
  }
}

async function main() {
  try {
    console.log('🌱 Seeding testimonials...');
    await seedCollection('testimonials', testimonials);

    console.log('🌱 Seeding gallery...');
    await seedCollection('gallery', gallery);

    console.log('🎉 Done!');
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error);
  }
}

main();
