import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginwellcart.firebaseapp.com",
  projectId: "loginwellcart",
  storageBucket: "loginwellcart.firebasestorage.app",
  messagingSenderId: "714954243475",
  appId: "1:714954243475:web:9fafbcf9fc04488869fc66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};