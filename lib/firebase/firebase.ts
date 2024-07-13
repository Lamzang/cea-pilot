import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqgzKBkWEt6s4x5hrVvlr48WdGOQRgqqo",
  authDomain: "cea-pilot-d1001.firebaseapp.com",
  projectId: "cea-pilot-d1001",
  storageBucket: "cea-pilot-d1001.appspot.com",
  messagingSenderId: "443562563559",
  appId: "1:443562563559:web:2887338639e0f85a400f42",
  measurementId: "G-K98KJN2HR6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const isNameUnique = async (name: string) => {
  await (
    await getDocs(collection(db, "users"))
  ).forEach((doc) => {
    console.log(doc);
    if (doc.data().username === name) {
      return false;
    }
  });

  return true;
};

export const isEmailUnique = async (email: string) => {
  await (
    await getDocs(collection(db, "users"))
  ).forEach((doc) => {
    if (doc.data().email === email) {
      return false;
    }
  });

  return true;
};
