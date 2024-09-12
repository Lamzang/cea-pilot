"use client";

import GoogleSignIn from "@/app/(homepage)/(auth)/googleSignIn";
import Input from "@/components/input";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/recoil/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [userAuth, setUserAuth] = useRecoilState(authState);
  const [errorMsg, setErrorMsg] = useState("");
  let userName = "";
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      e.currentTarget.userEmail.value,
      e.currentTarget.password.value
    );
    signInWithEmailAndPassword(
      auth,
      e.currentTarget.userEmail.value,
      e.currentTarget.password.value
    )
      .then(async (userCredential) => {
        await getDoc(doc(db, "users", userCredential.user.uid)).then((doc) => {
          if (doc.exists()) {
            userName = doc.data().username;
          }
        });
        setUserAuth({
          isLoggedIn: true,
          user: {
            username: userName,
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
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="border bg-white shadow-md rounded-lg w-full max-w-md p-8 flex flex-col justify-center gap-6">
        <div className="flex justify-center text-3xl font-bold text-gray-800 mb-4">
          로그인
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이메일 :
            </label>
            <Input
              name="userEmail"
              type="email"
              placeholder="이메일을 입력하세요"
              required
              errors={errorMsg ? [errorMsg] : undefined}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호 :
            </label>
            <Input
              name="password"
              type="password"
              minLength={4}
              placeholder="비밀번호를 입력하세요"
              required
              errors={errorMsg ? [errorMsg] : undefined}
            />
          </div>
          <button className="bg-customBlue-light text-white py-2 rounded-md hover:bg-customBlue-dark transition duration-300">
            로그인
          </button>
        </form>
        <div className="mt-4">
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default Login;
