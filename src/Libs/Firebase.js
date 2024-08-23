// firebase setup

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG4paM-0Ig5uUMojtEm5f64LQt1UxtbRk",
  authDomain: "kanaistore1.firebaseapp.com",
  projectId: "kanaistore1",
  storageBucket: "kanaistore1.appspot.com",
  messagingSenderId: "973736943051",
  appId: "1:973736943051:web:d3597a7484872560216a4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
const auth = getAuth(app)
// db
const db = getFirestore(app)

export {auth, db}