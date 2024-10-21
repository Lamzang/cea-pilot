"use client";

import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<any>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");
  const router = useRouter();

  const saveToFirestore = async () => {
    setUploading(true);
    try {
      await addDoc(collection(db, "announcements"), {
        title: title,
        content: text,
        createdAt: new Date(),
        fileUrls: [],
        tag: tag,
        fileNames: [],
      });
      alert("공지사항이 성공적으로 저장되었습니다!");
      router.push("/admin/notice");
    } catch (e) {
      alert("오류가 발생하였습니다 다시 실행해주세요 ");
    }
    setTitle("");
    setUploading(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">공지사항 작성</h1>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        onChange={onChange}
        value={title}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="필요시 태그를 입력하세요(예: 정회원, 주요공지 "
        onChange={onChangeTag}
        value={tag}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {uploading ? (
        <div className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          업로딩중..
        </div>
      ) : (
        <button
          onClick={saveToFirestore}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          저장하기
        </button>
      )}
    </div>
  );
}
