import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjQCTdwB9njJFKs1yagiTUJyJkbIDx3UU",
  authDomain: "hippomanager-f13ac.firebaseapp.com",
  projectId: "hippomanager-f13ac",
  storageBucket: "hippomanager-f13ac.firebasestorage.app",
  messagingSenderId: "14079305450",
  appId: "1:14079305450:web:45886ca206e0da6c4d1993",
  databaseURL: "https://hippomanager-f13ac-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

export const database = getDatabase(app);
