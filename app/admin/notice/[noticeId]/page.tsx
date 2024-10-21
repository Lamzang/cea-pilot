"use client";

import React, { useEffect, useState, useCallback } from "react";

import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { set } from "firebase/database";
import { useRecoilState } from "recoil";
import { authState, userDocState } from "@/lib/recoil/auth";

export default function Page({ params }: { params: { noticeId: string } }) {
  const [title, setTitle] = useState<string>("");
  const [announcement, setAnnouncement] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileData, setFileData] = useState<any[]>([]);
  const [text, setText] = useState<any>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const docRef = doc(db, "announcements", params.noticeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAnnouncement(data);
          setTitle(data.title);
          if (data.fileUrls || data.fileNames) {
            setSelectedFiles([...data.fileUrls]);
            setFileData([...data.fileNames]);
          }
          if (data.tag) {
            setTag(data.tag);
          }
          setText(data.content);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [params.noticeId]);

  const saveToFirestore = async () => {
    let fileUrls: string[] = [];
    let fileNames: string[] = [];
    setUploading(true);

    try {
      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const fileUrlArray = await handleUploadFile(selectedFiles[i]);
          fileNames.push(fileUrlArray[0]);
          fileUrls.push(fileUrlArray[1]);
        }
      }
    } catch (e) {
      console.error("파일 업로드 중 문제가 발생하였습니다: ", e);
    }

    try {
      await setDoc(doc(db, "announcements", params.noticeId), {
        title: title,
        content: text,
        author: "관리자",
        createdAt: new Date(),
        fileUrls: fileUrls,
        fileNames: fileNames,
        tag: tag,
      });
      alert("공지사항이 성공적으로 저장되었습니다!");
      router.push("/admin/notice");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setUploading(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };
  const storage = getStorage();
  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleUploadFile = async (file: any) => {
    const storageReference = storageRef(
      storage,
      `uploads/reference/${file?.name}`
    );
    const snapshot = await uploadBytes(storageReference, file);
    const fileUrl = await getDownloadURL(snapshot.ref);
    return [file.name, fileUrl];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!announcement) {
    return <div>Document not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">공지사항 수정</h1>
      <div className="">
        <label className="mb-2 text-lg font-semibold">제목</label>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          onChange={onChange}
          value={title}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <label className="mb-2 text-lg font-semibold">태그</label>
      <input
        type="text"
        placeholder="필요시 태그를 입력하세요(예: 정회원, 주요공지) "
        onChange={onChangeTag}
        value={tag}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block text-sm font-medium text-gray-700">
        파일업로드
      </label>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none mb-6 p-2 mt-2"
      />
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index} className="flex gap-4">
            <div className="text-sm text-gray-600">
              업로드 파일 : {fileData[index]}
            </div>
            <div className="text-sm text-gray-600">
              파일 크기 : {Math.floor(file.size / 1024)}KB
            </div>
            <div>
              <button
                onClick={() =>
                  setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
                }
                className="text-sm text-red-500"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

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
