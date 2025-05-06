import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const contentRef = doc(db, 'home', 'main');

export async function getHomeContent() {
  const snapshot = await getDoc(contentRef);
  return snapshot.exists() ? snapshot.data() : null;
}

export async function updateHomeContent(data: any) {
  await setDoc(contentRef, data);
  return data;
}
