import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAqgzKBkWEt6s4x5hrVvlr48WdGOQRgqqo",
  authDomain: "cea-pilot-d1001.firebaseapp.com",
  projectId: "cea-pilot-d1001",
  storageBucket: "cea-pilot-d1001.appspot.com",
  messagingSenderId: "443562563559",
  appId: "1:443562563559:web:2887338639e0f85a400f42",
  measurementId: "G-K98KJN2HR6",
  databaseURL:
    "https://cea-pilot-d1001-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
auth.useDeviceLanguage();

//https://firebase.google.com/docs/firestore/security/rules-query?hl=ko

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
  } else {
    console.log("User is signed out");
  }
});
