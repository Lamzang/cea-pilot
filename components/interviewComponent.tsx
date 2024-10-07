"use client";

import { db } from "@/lib/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export default function InterviewComponent() {
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
    <form className="bg-white px-8 pt-6 pb-8  w-full ">
      {/* Title Input */}
      <div className="mb-4 w-full">
        <label className="sr-only">이메일</label>
        <input
          id="title"
          type="text"
          placeholder="답변받을 이메일 주소"
          name="email"
          onChange={handleInputChange}
          className=" appearance-none border rounded w-full text-base py-2 px-3 mb-3 text-gray-700 leading-tight  "
        />
        <label className="sr-only">상담제목</label>
        <input
          id="title"
          type="text"
          placeholder="상담제목"
          name="title"
          onChange={handleInputChange}
          className=" appearance-none border rounded w-full text-base py-2 px-3 text-gray-700 leading-tight  "
        />
      </div>

      {/* Content Editable Field */}
      <div className="mb-6 w-full">
        <label className="sr-only">상담내용</label>
        <textarea
          id="description"
          name="description"
          placeholder="상담 내용을 입력하세요"
          onChange={handleInputChange}
          className="shadow appearance-none border text-base rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="flex w-full items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          상담하기
        </button>
      </div>
    </form>
  );
}
