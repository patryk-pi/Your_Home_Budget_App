// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyALd9bV7Q914LtBc1tik-bNRfnPf-xn0nM",
    authDomain: "smartspend-6d311.firebaseapp.com",
    projectId: "smartspend-6d311",
    storageBucket: "smartspend-6d311.appspot.com",
    messagingSenderId: "450848052339",
    appId: "1:450848052339:web:bbf816974d4634c2c84606",
    measurementId: "G-97B889SNCY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);