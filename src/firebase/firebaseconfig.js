// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6K-pzJQdYLDz9e0_r_Ctqr_7Om4tkRLw",
  authDomain: "e-commerce-f7f84.firebaseapp.com",
  projectId: "e-commerce-f7f84",
  storageBucket: "e-commerce-f7f84.firebasestorage.app",
  messagingSenderId: "835515287",
  appId: "1:835515287:web:e637a85ec5108679ec8ad2",
  measurementId: "G-ZYLV7W8RZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });