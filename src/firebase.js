import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDzHXIm36IRUAmYkKr2JFlCDgW94mUIK0w",
  authDomain: "ur-chat-37930.firebaseapp.com",
  projectId: "ur-chat-37930",
  storageBucket: "ur-chat-37930.appspot.com",
  messagingSenderId: "212927742859",
  appId: "1:212927742859:web:edf8da2ce16446ab6de58e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);