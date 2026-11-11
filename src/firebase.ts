import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRapgE87-NoBrSPyquIixPhaFR_qUuz4k",
  authDomain: "app-prato-do-dia.firebaseapp.com",
  projectId: "app-prato-do-dia",
  storageBucket: "app-prato-do-dia.firebasestorage.app",
  messagingSenderId: "879499090387",
  appId: "1:879499090387:web:191b9b74f17c82468bb726",
  measurementId: "G-M9KM75NC0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export let analytics: any = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
      } catch (e) {
        console.warn("Analytics not initialized:", e);
      }
    }
  }).catch(() => {});
}

export default app;
