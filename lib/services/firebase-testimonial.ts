import { db } from "@/lib/firebase-client";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const collectionName = "testimonials";

export async function getAllTestimonials() {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addTestimonial(data: any) {
  const ref = await addDoc(collection(db, collectionName), data);
  return ref.id;
}

export async function deleteTestimonial(id: string) {
  await deleteDoc(doc(db, collectionName, id));
}
