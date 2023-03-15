// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjO_-19w8GmrjN57JJJI0DTLvYmP4fyrg",
    authDomain: "your-home-budget-patryk-pi.firebaseapp.com",
    projectId: "your-home-budget-patryk-pi",
    storageBucket: "your-home-budget-patryk-pi.appspot.com",
    messagingSenderId: "911827298670",
    appId: "1:911827298670:web:b104441f952d5750c9397f",
    measurementId: "G-FFFQXB72K9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);