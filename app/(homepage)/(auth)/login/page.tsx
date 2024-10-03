"use client";

import Input from "@/components/input";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/recoil/auth";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { getKoreanErrorText } from "@/lib/auth_functions";
import Link from "next/link";

const Login = () => {
  const [userAuth, setUserAuth] = useRecoilState(authState);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickModal = () => setIsModalOpen((prev) => !prev);
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
        router.push("/");
      })
      .catch((error) => {
        setErrorMsg(getKoreanErrorText(error.code));
      });
  };

  const sendEmailfindPassword = () => {
    sendPasswordResetEmail(auth, "");
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-50">
      <div className="border bg-white shadow-md rounded-lg my-20 w-full max-w-md p-8 flex flex-col justify-center gap-6">
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
              autoComplete="off"
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
              autoComplete="off"
              minLength={4}
              placeholder="비밀번호를 입력하세요"
              required
              errors={errorMsg ? [errorMsg] : undefined}
            />
          </div>
          <button className="bg-customBlue-light text-white mt-5 py-2 rounded-md hover:bg-customBlue-dark transition duration-300">
            로그인
          </button>
        </form>
        <div className="w-full flex justify-between">
          <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
            비밀번호 찾기
          </div>
          <Link href="/create-account">회원가입하기</Link>
        </div>

        {isModalOpen && <Modal onClose={clickModal} />}
      </div>
    </div>
  );
};

export default Login;

function Modal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("이메일이 전송되었습니다.");
      })
      .catch((error) => {
        alert("이메일 전송에 실패하였습니다.");
      })
      .finally(() => {
        onClose();
      });
  };
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-customModalBg-default flex justify-center items-center z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black flex flex-col rounded-2xl p-4 w-72 z-50"
      >
        <form onSubmit={onSubmit} className="mt-4">
          <div className="mb-4">
            <Input
              name="makeRoom"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <button className="bg-blue-500 text-white w-full py-2 rounded">
            비밀번호 찾기
          </button>
        </form>
      </div>
    </div>
  );
}
