"use client";

import { db } from "@/lib/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { describe } from "node:test";
import { useState } from "react";

export default function Page() {
  const [questionData, setQuestionData] = useState({
    email: "",
    title: "",
    description: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDoc(collection(db, "questions"), questionData)
      .then((docRef) => {
        alert("문의가 성공적으로 등록되었습니다.");
      })
      .catch((error) => {
        alert("문의 등록에 실패했습니다.");
      });
    setQuestionData({ email: "", title: "", description: "" });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold  ml-8 border-b-2 pb-6 mt-6 mb-10">
        문의사항
      </h1>
      <div>
        <div className="border-2 border-gray-300 p-5 m-10 mt-20 rounded-3xl relative">
          <div className="font-bold text-xl absolute -top-3 bg-white px-5">
            상담 이용안내
          </div>
          <div className="flex flex-col p-4 gap-3">
            <div className="text-gray-500">1. 문의사항을 남겨주세요</div>
            <div className="text-gray-500">
              2. 담당자 확인 후 처리합니다. (2~3일정도 시간이 걸릴 수 있습니다.)
            </div>
            <div className="text-gray-500">
              3. 답변내용을 개인메일로 발송합니다.
            </div>
          </div>
        </div>
        <h1 className="mx-10 text-2xl font-bold  mt-16">문의하기</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 mx-10 mb-32 mt-5"
        >
          <label htmlFor="email" className="sr-only">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일"
            className="border-2 border-gray-300 p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />

          <label htmlFor="subject" className="sr-only">
            제목
          </label>
          <input
            type="text"
            id="subject"
            name="title"
            placeholder="제목"
            onChange={handleInputChange}
            className="border-2 border-gray-300 p-2 rounded-lg"
            required
          />

          <label htmlFor="message" className="sr-only">
            내용
          </label>
          <textarea
            id="message"
            name="description"
            placeholder="내용"
            onChange={handleInputChange}
            className="border-2 border-gray-300 p-2 rounded-lg h-40"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 mt-5 rounded-lg hover:bg-blue-600 transition-all"
          >
            문의하기
          </button>
        </form>
      </div>
    </div>
  );
}
