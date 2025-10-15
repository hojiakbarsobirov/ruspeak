// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA44znZTfP59cxIpDi2itUPoulPj4WVDgY",
  authDomain: "ruspeak-5c210.firebaseapp.com",
  projectId: "ruspeak-5c210",
  storageBucket: "ruspeak-5c210.firebasestorage.app",
  messagingSenderId: "674060873189",
  appId: "1:674060873189:web:93b3ccc4f6528ec6aa130c",
  measurementId: "G-5TXT42CLWV",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
