import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
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
