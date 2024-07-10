import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);
