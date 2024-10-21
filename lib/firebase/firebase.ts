import { initializeApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
export const app = initializeApp(firebaseConfig);

/* const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6LdNUWMqAAAAAAm4X-FOUqEm3Ejo9uZ4rUWJVoN6"
  ),
  isTokenAutoRefreshEnabled: true,
}); */

/* if (typeof window !== "undefined") {
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
      "4125348E-6103-41A2-BBF8-7F164DC3B74E"
    ),
    isTokenAutoRefreshEnabled: true,
  });
} */

//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
auth.useDeviceLanguage();

setPersistence(auth, browserSessionPersistence);

//https://firebase.google.com/docs/firestore/security/rules-query?hl=ko
