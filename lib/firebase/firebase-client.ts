// lib/firebase/firebase-client.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-tx4F-1Sz9H5MS0H_iv6cWmsfcbm7Nk",
  authDomain: "shubhamtours-efe6f.firebaseapp.com",
  projectId: "shubhamtours-efe6f",
  storageBucket: "shubhamtours-efe6f.appspot.com",
  messagingSenderId: "61100172634",
  appId: "1:61100172634:web:5b3b4b52a9c2f478687f63",
  measurementId: "G-7CJ1RY76EH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
