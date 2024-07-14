"use client";

import { auth } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

export default function GoogleSignIn() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [userAuth, setUserAuth] = useRecoilState(authState);
  const googleSignIn = async () => {
    console.log("start");
    await setPersistence(auth, browserLocalPersistence);
    await console.log("googleSignIn");
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUserAuth((prev) => ({ ...prev, isLoggedIn: true }));
        router.push("/");
        // 닉네임은 나중에 생각하자
      })
      .catch((error) => {
        console.log(error, "errored");
        // ...자세한 에러처리는 나중에
      });
  };
  return (
    <div className="cursor-grab" onClick={googleSignIn}>
      Google로 회원가입
    </div>
  );
}
