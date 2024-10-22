"use client";

import React, { useEffect, useState } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useRecoilValue } from "recoil";
import { authState } from "@/lib/recoil/auth";
import { set } from "firebase/database";
import { useRouter } from "next/navigation";

const RichTextExample = ({ params }: { params: { subDataID: string } }) => {
  const [title, setTitle] = useState<string>("");
  const user = useRecoilValue(authState);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [text, setText] = useState<any>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };
  const storage = getStorage();

  const handleUploadFile = async (file: any) => {
    const storageReference = storageRef(
      storage,
      `uploads/reference/${params.subDataID}/${file?.name}`
    );
    const snapshot = await uploadBytes(storageReference, file);
    const fileUrl = await getDownloadURL(snapshot.ref);
    return [file.name, fileUrl];
  };

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
      await addDoc(collection(db, "reference", params.subDataID, "sub"), {
        title: title,
        content: text,
        author: "관리자",
        createdAt: new Date(),
        fileUrls: fileUrls,
        fileNames: fileNames,
      });
      alert("저장되었습니다.");
      router.push("/admin/data-container/" + params.subDataID);
    } catch (e) {
      console.error("문제가 발생하였습니다: ", e);
    }
    setTitle("");
    setSelectedFiles([]);
    setUploading(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">자료 추가하기</h1>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        onChange={onChange}
        value={title}
        required
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
              업로드 파일 : {file.name}
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
        placeholder="내용을 입력하세요"
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
};

export default RichTextExample;
