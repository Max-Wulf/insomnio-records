
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "proyecto-disquera.firebaseapp.com",
  projectId: "proyecto-disquera",
  storageBucket: "proyecto-disquera.firebasestorage.app",
  messagingSenderId: "245333181981",
  appId: "1:245333181981:web:ec53dedc1deb4f3938a8f4",
  measurementId: "G-85DDE6BW4B"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
