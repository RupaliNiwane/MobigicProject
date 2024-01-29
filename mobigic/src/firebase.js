// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBbxKe73hpIfc-ZqVctvv1qyXcRjzSoWlA",
  authDomain: "mobigic-5a84b.firebaseapp.com",
  projectId: "mobigic-5a84b",
  storageBucket: "mobigic-5a84b.appspot.com",
  messagingSenderId: "727959658995",
  appId: "1:727959658995:web:7391e7646ac5be71d6b286",
  measurementId: "G-263M87BK2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getDatabase(app);


export default app ;