"use client";

import { auth, db } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

export default function GoogleSignIn({
  state,
}: {
  state: "create-account" | "login";
}) {
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

        setUserAuth({
          isLoggedIn: true,
          user: {
            username: user.displayName || "",
            email: result.user.email || "",
            uid: result.user.uid || "",
          },
        });
        // firestore에 유저 정보 저장
        // email을 key로 사용, 근데 위험할 수도 있음?
        setDoc(doc(db, "users", user.email as string), {
          username: user.displayName || "",
          email: user.email,
          uid: user.uid,
        });

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
      {state === "create-account" ? "Google로 회원가입" : "Google로 로그인"}
    </div>
  );
}
