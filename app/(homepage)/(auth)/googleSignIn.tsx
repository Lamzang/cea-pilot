"use client";

import { auth, db } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

export default function GoogleSignIn() {
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
        const userData = (await getDoc(doc(db, "users", user.uid))).data();

        setUserAuth({
          isLoggedIn: true,
          user: {
            username: user.displayName || "",
            email: result.user.email || "",
            uid: result.user.uid || "",
            address: "",
            membership: userData?.membership ?? "basic",
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
      <img src="/assets/google/web_light_sq_SI@1x.png" alt="google로 로그인" />
    </div>
  );
}
