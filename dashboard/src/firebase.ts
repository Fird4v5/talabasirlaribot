import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFcXeJrStywOc0MipbH-TkJtGWbxpAeo8",
  authDomain: "talabasirlaribot.firebaseapp.com",
  projectId: "talabasirlaribot",
  storageBucket: "talabasirlaribot.firebasestorage.app",
  messagingSenderId: "193757226543",
  appId: "1:193757226543:web:f89847d5e5f946bddd88da",
  measurementId: "G-PMZ1SKM3JB"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app); 