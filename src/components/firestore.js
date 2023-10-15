import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc as firestoreAddDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCaGcE8rCHreaxQx0hJWDd9XzuNWOpNgpg",
  authDomain: "filmyverse-b5151.firebaseapp.com",
  projectId: "filmyverse-b5151",
  storageBucket: "filmyverse-b5151.appspot.com",
  messagingSenderId: "382511212088",
  appId: "1:382511212088:web:05ca7fd646872d76f528cd",
  measurementId: "G-PG4T00J4S1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,"movies");
export const reviewRef = collection(db,"reviews");
export const addDoc = firestoreAddDoc; 
export default app;