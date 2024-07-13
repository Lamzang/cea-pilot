"use server";

import { auth } from "@/lib/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { redirect } from "next/navigation";

const provider = new GoogleAuthProvider();

auth.useDeviceLanguage();

//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
//참고 : https://developers.google.com/identity/protocols/oauth2/scopes?hl=ko

/* provider.setCustomParameters({
  login_hint: "user@example.com",
}); */

// 휴대용 기능에서는 아래를 권장합니다.
/* 
import { getAuth, signInWithRedirect } from "firebase/auth";

const auth = getAuth();
signInWithRedirect(auth, provider); */

export const googleSignIn = async () => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user, token);
      redirect("/login");
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error, errorCode, errorMessage, email, credential);
      // ...
    });
};
