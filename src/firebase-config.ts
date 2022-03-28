import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANgjPLmowtPR1TfJX3YX6w-vSgeBueCAk",
  authDomain: "todo-list-app-6d21d.firebaseapp.com",
  projectId: "todo-list-app-6d21d",
  storageBucket: "todo-list-app-6d21d.appspot.com",
  messagingSenderId: "464762088072",
  appId: "1:464762088072:web:2b01c16dc416b7b5b20d3d",
  measurementId: "G-18TPTNT7WZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
