"use client";

import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState(""); // 초기값으로 user의 이메일 사용
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // 에러 초기화
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err) {
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full flex justify-center z-50">
      <div onClick={onClose} className="fixed top-0 left-0 w-full h-full " />
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black flex flex-col rounded-2xl p-6 w-80 shadow-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-105"
      >
        <div className="my-4">
          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
            <input
              value={email}
              onChange={onChangeEmail}
              name="userId"
              type="email"
              placeholder="이메일"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              value={password}
              onChange={onChangePassword}
              name="password"
              type="password"
              placeholder="비밀번호"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
