import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCyb2ehx_Mx3-TyEH92D124RXhrj3Y9C4s",
  authDomain: "earthwise-7c8fd.firebaseapp.com",
  projectId: "earthwise-7c8fd",
  storageBucket: "earthwise-7c8fd.appspot.com",
  messagingSenderId: "762776486043",
  appId: "1:762776486043:web:36b7c59b654503e7d1063e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Use default web-like Auth (no AsyncStorage persistence)
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ You can still listen for auth changes (optional)
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("User logged out");
  }
});

// ✅ Logout function
export const logout = async () => {
  await signOut(auth);
};

export { auth, db };
