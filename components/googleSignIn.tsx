"use client";

import { auth } from "@/lib/firebase/firebase";
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { redirect } from "next/navigation";

const provider = new GoogleAuthProvider();

const googleSignIn = async () => {
  console.log("start");
  await setPersistence(auth, browserLocalPersistence);
  await console.log("googleSignIn");
  await signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      redirect("/login");
      // 닉네임은 나중에 생각하자
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;

      console.log(error, "errored");
      // ...자세한 에러처리는 나중에
    });
};

export default function GoogleSignIn() {
  return (
    <div className="cursor-grab" onClick={googleSignIn}>
      Google로 회원가입
    </div>
  );
}
