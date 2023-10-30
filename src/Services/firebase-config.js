import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Restrict HTTP referrers
const firebaseConfig = {
  apiKey: "AIzaSyBecxr2ghHOBUzujlQdbCNlAC8NUOK96Xw",
  authDomain: "tf-santander.firebaseapp.com",
  projectId: "tf-santander",
  storageBucket: "tf-santander.appspot.com",
  messagingSenderId: "313523654218",
  appId: "1:313523654218:web:656d9723c41baad1e2e0b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
