"use client";

import { auth, db } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

export default function GoogleSignUp() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [userAuth, setUserAuth] = useRecoilState(authState);
  const onClick = async () => {
    console.log("start");
    await setPersistence(auth, browserLocalPersistence);
    await console.log("googleSignIn");
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log(user);

        const userData = {
          username: user.displayName || "",
          email: user.email,
          uid: user.uid,
        };

        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const json = await response.json();
        if (!response.ok) {
          console.log(json);
          return;
        }
        setUserAuth({
          isLoggedIn: true,
          user: {
            username: user.displayName || "",
            email: result.user.email || "",
            uid: result.user.uid || "",
            address: "",
            membership: "basic",
          },
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
    <div className="cursor-grab" onClick={onClick}>
      <img
        src="/assets/google/web_light_sq_SU@1x.png"
        alt="google로 회원가입"
      />
    </div>
  );
}
