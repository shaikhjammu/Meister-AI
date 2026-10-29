import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCk7xkE78vXENUG7Es2_XF0RyARFQmpbNo",
  authDomain: "meisterai-a987b.firebaseapp.com",
  databaseURL: "https://meisterai-a987b-default-rtdb.firebaseio.com/",
  projectId: "meisterai-a987b",
  storageBucket: "meisterai-a987b.firebasestorage.app",
  messagingSenderId: "968781582610",
  appId: "1:968781582610:web:521280563dc8bfdecf23cb",
  measurementId: "G-ES1Z2BG6SY"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Initialize Analytics safely in supported browser environments
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, database, analytics };
