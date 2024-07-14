"use client";

import GoogleSignIn from "@/components/googleSignIn";
import Input from "@/components/input";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { logIn } from "./action";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/recoil/auth";

const Login = () => {
  const [state, dispatch] = useFormState(logIn, null);
  const [userAuth, setUserAuth] = useRecoilState(authState);
  useEffect(() => {
    if (state?.success) {
      setUserAuth((prev) => ({ ...prev, isLoggedIn: true }));
    }
  }, [state]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border w-1/4 h-2/4 flex flex-col justify-center content-between gap-5">
        <div className=" flex justify-center text-3xl font-bold">로그인</div>
        <form action={dispatch} className=" flex flex-col">
          <div>
            <label htmlFor="email">이메일 : </label>
            <Input
              name="userEmail"
              type="email"
              placeholder="이메일을 입력하세요"
              required
              errors={state?.Error ? [state.Error] : undefined}
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
              errors={state?.Error ? [state.Error] : undefined}
            />
          </div>
          <button>로그인</button>
        </form>
        <GoogleSignIn />
      </div>
    </div>
  );
};

export default Login;
