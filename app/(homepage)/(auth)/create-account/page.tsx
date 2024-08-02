"use client";

import Input from "@/components/input";
import React from "react";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

import GoogleSignIn from "@/app/(homepage)/(auth)/googleSignIn";

const CreateAccount = () => {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="border bg-white shadow-md rounded-lg w-full max-w-md p-8 flex flex-col justify-center gap-6">
        <div className="flex justify-center text-3xl font-bold text-gray-800 mb-4">
          회원가입
        </div>
        <form action={dispatch} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이름 :
            </label>
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
              errors={state?.Error?.userEmail}
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
              //errors={state?.fieldErrors?.password}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호 확인 :
            </label>
            <Input
              name="password_confirm"
              type="password"
              minLength={4}
              placeholder="비밀번호를 한번 더 입력하세요"
              required
              errors={state?.Error?.password_confirm}
            />
          </div>
          <button className="bg-customBlue-light text-white py-2 rounded-md hover:bg-customBlue-dark transition duration-300">
            회원가입
          </button>
        </form>
        <div className="mt-4">
          <GoogleSignIn state="create-account" />
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
