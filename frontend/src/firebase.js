// Firebase web config comes from VITE_FIREBASE_* variables (see frontend/.env.example).
// In demo mode (no API key set) Firebase is not initialised at all.
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { DEMO_MODE } from "./demo/demoMode";

let auth = null;
let provider = null;

if (!DEMO_MODE) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };

  initializeApp(firebaseConfig);
  auth = getAuth();
  provider = new GoogleAuthProvider();
}

export { auth, provider };
