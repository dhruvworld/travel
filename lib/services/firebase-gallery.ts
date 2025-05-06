import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const galleryCollection = collection(db, 'gallery');

export async function addGalleryImage(data: any) {
  const docRef = await addDoc(galleryCollection, data);
  return { id: docRef.id, ...data };
}

export async function deleteGalleryImage(id: string) {
  await deleteDoc(doc(galleryCollection, id));
}

export async function getGalleryImages() {
  const snapshot = await getDocs(galleryCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
