"use client";

import GoogleSignIn from "@/app/(homepage)/(auth)/googleSignIn";
import Input from "@/components/input";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/recoil/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";

const Login = () => {
  const [userAuth, setUserAuth] = useRecoilState(authState);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      e.currentTarget.userEmail.value,
      e.currentTarget.password.value
    )
      .then((userCredential) => {
        setUserAuth({
          isLoggedIn: true,
          user: {
            username: userCredential.user.displayName ?? "",
            email: userCredential.user.email ?? "",
            uid: userCredential.user.uid ?? "",
            address: "",
          },
        });
        router.push("/");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border w-1/4 h-2/4 flex flex-col justify-center content-between gap-5">
        <div className=" flex justify-center text-3xl font-bold">로그인</div>
        <form onSubmit={onSubmit} className=" flex flex-col">
          <div>
            <label htmlFor="email">이메일 : </label>
            <Input
              name="userEmail"
              type="email"
              placeholder="이메일을 입력하세요"
              required
              errors={errorMsg ? [errorMsg] : undefined}
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호 : </label>
            <Input
              name="password"
              type="password"
              minLength={4}
              placeholder="비밀번호를 입력하세요"
              required
              errors={errorMsg ? [errorMsg] : undefined}
            />
          </div>
          <button>로그인</button>
        </form>
        <GoogleSignIn state="login" />
      </div>
    </div>
  );
};

export default Login;
