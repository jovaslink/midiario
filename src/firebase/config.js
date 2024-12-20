// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwO4NlSV1AuNJ62TUjhYEWHnBmaPObwPk",
  authDomain: "midiario-bbf24.firebaseapp.com",
  projectId: "midiario-bbf24",
  storageBucket: "midiario-bbf24.appspot.com",
  messagingSenderId: "1011921835059",
  appId: "1:1011921835059:web:c2bf44e5b51d2f3de9ff46"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);