// Import core Firebase services
import { initializeApp } from "firebase/app";

// Import Authentication service
import { getAuth } from "firebase/auth";

// Import Firestore (optional but recommended)
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoNXygLXa6kCbaKgJjIDOuuPnTwBCTJjU",
  authDomain: "clone-76d0a.firebaseapp.com",
  projectId: "clone-76d0a",
  storageBucket: "clone-76d0a.firebasestorage.app",
  messagingSenderId: "946280843684",
  appId: "1:946280843684:web:19e42f4a3279f6d16b9931",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Firestore database (optional)
