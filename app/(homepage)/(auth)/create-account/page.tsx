"use client";

import Input from "@/components/input";
import React from "react";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

import GoogleSignIn from "@/app/(auth)/googleSignIn";

const CreateAccount = () => {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border w-1/4 h-3/4 flex flex-col justify-center content-between gap-5">
        <div className=" flex justify-center text-3xl font-bold">회원가입</div>
        <form action={dispatch} className=" flex flex-col">
          <div>
            <label htmlFor="text">이름 : </label>
            <Input
              name="username"
              type="text"
              placeholder="이름을 입력하세요"
              required
              minLength={3}
              maxLength={10}
            />
          </div>
          <div>
            <label htmlFor="email">이메일 : </label>
            <Input
              name="userEmail"
              type="email"
              placeholder="이메일을 입력하세요"
              required
              errors={state?.Error?.userEmail}
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
              //errors={state?.fieldErrors?.password}
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호 확인 : </label>
            <Input
              name="password_confirm"
              type="password"
              minLength={4}
              placeholder="비밀번호를 한번 더 입력하세요"
              required
              errors={state?.Error?.password_confirm}
            />
          </div>
          <button>회원가입</button>
        </form>
        <GoogleSignIn />
      </div>
    </div>
  );
};

export default CreateAccount;
