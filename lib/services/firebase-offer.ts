// import { db } from '../firebase';
// import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

// const offerCollection = collection(db, 'offers');

// export async function addOffer(data: any) {
//   const docRef = await addDoc(offerCollection, data);
//   return { id: docRef.id, ...data };
// }

// export async function deleteOffer(id: string) {
//   await deleteDoc(doc(offerCollection, id));
// }

// export async function getOffers() {
//   const snapshot = await getDocs(offerCollection);
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// }
