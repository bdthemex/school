
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "kjsghs-info-hub",
  "appId": "1:480647444319:web:d07e550666855487cb68ea",
  "storageBucket": "kjsghs-info-hub.appspot.com",
  "apiKey": "AIzaSyC7o6alC6z5WjsMKdzyWGCcn4GwPhBMF9E",
  "authDomain": "kjsghs-info-hub.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "480647444319"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
