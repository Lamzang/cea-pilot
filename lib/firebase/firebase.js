import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7aT-rC8V7U1Tvui23eeMyz0M6SAGOeFU",
  authDomain: "cea-pilot.firebaseapp.com",
  projectId: "cea-pilot",
  storageBucket: "cea-pilot.appspot.com",
  messagingSenderId: "735044515566",
  appId: "1:735044515566:web:4ba2d69d27d2848bd165ff",
  measurementId: "G-S15N4X2P84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
