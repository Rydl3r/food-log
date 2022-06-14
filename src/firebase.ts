// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1QsZvGY4R686CDeMbM4P4mbiW-ClWWxo",
  authDomain: "food-log-b93db.firebaseapp.com",
  projectId: "food-log-b93db",
  storageBucket: "food-log-b93db.appspot.com",
  messagingSenderId: "50449421840",
  appId: "1:50449421840:web:bf80fc8766cd3d46511c95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
