// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb1EX6uSpgKYBE6IeBCi8GMjUCMDtnUyc",
  authDomain: "blogs-91fa0.firebaseapp.com",
  projectId: "blogs-91fa0",
  storageBucket: "blogs-91fa0.firebasestorage.app",
  messagingSenderId: "750684108272",
  appId: "1:750684108272:web:6bd29b02e7d3cfdad55935",
  measurementId: "G-V5K13CGJ2H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export default app;
