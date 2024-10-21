"use client";

import { db } from "@/lib/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();
  const onChange = (e: any) => {
    setData(e.target.value);
  };
  useEffect(() => {
    getDoc(doc(db, "info", "introduce")).then((doc) => {
      if (doc.exists()) {
        setData(doc.data().content);
      }
    });
  }, []);
  const saveToFirestore = async () => {
    setUploading(true);
    try {
      await setDoc(doc(db, "info", "introduce"), {
        content: data,
      });
      setUploading(false);
      alert("저장되었습니다.");
      router.push("/admin");
    } catch (e) {
      console.error("파일 업로드 중 문제가 발생하였습니다: ", e);
    }
  };
  return (
    <div className="p-10 h-full">
      <h1 className="text-3xl font-bold mb-5">인사말 수정하기</h1>
      <textarea
        className="border border-gray-300 rounded-md p-2 w-full h-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
        value={data}
        onChange={onChange}
      ></textarea>
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
