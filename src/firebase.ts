import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfd1HTN-ByNaEJAr-rSNYvI2I4Q57XEpo",
  authDomain: "vue-shop-231c1.firebaseapp.com",
  databaseURL:
    "https://vue-shop-231c1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-shop-231c1",
  storageBucket: "vue-shop-231c1.firebasestorage.app",
  messagingSenderId: "173470296339",
  appId: "1:173470296339:web:f1f6c4dddc0e6ced6a92e6",
  measurementId: "G-C7YQMX76S1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
