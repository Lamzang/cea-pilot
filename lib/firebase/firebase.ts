import { initializeApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9aqOd-_JAhwj91q2OAi5gWmRYqPL_uvY",
  authDomain: "kcbea-portal.firebaseapp.com",
  databaseURL:
    "https://kcbea-portal-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kcbea-portal",
  storageBucket: "kcbea-portal.appspot.com",
  messagingSenderId: "812873806032",
  appId: "1:812873806032:web:2238eb31667e5b27f36ed5",
  measurementId: "G-4DL0YEJ7XV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
      "6LdNUWMqAAAAAMPUvbe60GJyoDXFA3fkMprVs59o"
    ),
    isTokenAutoRefreshEnabled: true,
  });
}
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
auth.useDeviceLanguage();

//https://firebase.google.com/docs/firestore/security/rules-query?hl=ko
