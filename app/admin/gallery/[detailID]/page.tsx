"use client";

import React, { useEffect, useState } from "react";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function Page({ params }: { params: { detailID: string } }) {
  const [title, setTitle] = useState<string>("");
  const [announcement, setAnnouncement] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [selectedFiles, setSelectedFiles] = useState<any[]>([]); // 파일 객체 및 URL을 저장하는 배열
  const [fileData, setFileData] = useState<any[]>([]); // 파일 이름 저장
  const [text, setText] = useState<any>("");
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const docRef = doc(db, "gallery", params.detailID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAnnouncement(data);
          setTitle(data.title);
          // 기존 파일 정보 설정 (파일 이름과 URL을 각각 저장)
          if (data.fileUrls && data.fileNames) {
            setFileData([...data.fileNames]); // 파일 이름 설정
            const existingFiles = data.fileUrls.map(
              (url: string, index: number) => ({
                name: data.fileNames[index],
                url: url,
              })
            );
            setSelectedFiles(existingFiles);
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
  }, [params.detailID]);

  const saveToFirestore = async () => {
    let fileUrls: string[] = [];
    let fileNames: string[] = [];
    setUploading(true);

    try {
      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          // 기존 파일인 경우 URL을 그대로 사용
          if (selectedFiles[i].url) {
            fileNames.push(selectedFiles[i].name);
            fileUrls.push(selectedFiles[i].url);
          } else {
            // 새로운 파일 업로드
            const fileUrlArray = await handleUploadFile(selectedFiles[i].file);
            fileNames.push(fileUrlArray[0]);
            fileUrls.push(fileUrlArray[1]);
          }
        }
      }
    } catch (e) {
      console.error("파일 업로드 중 문제가 발생하였습니다: ", e);
    }

    try {
      console.log(title, text, fileUrls, fileNames);
      await updateDoc(doc(db, "gallery", params.detailID), {
        title: title,
        author: "관리자",
        createdAt: new Date(),
        fileUrls: fileUrls,
        fileNames: fileNames ?? "",
      });
      alert("공지사항이 성공적으로 저장되었습니다!");
      router.push(`/admin/gallery`);
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
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        file: file,
      }));
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };
  const storage = getStorage();

  const handleUploadFile = async (file: any) => {
    const storageReference = storageRef(
      storage,
      `uploads/gallery/${file?.name}`
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
      <h1 className="text-3xl font-bold mb-6 text-center">자료 수정하기</h1>
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
            <img
              src={file.url ? file.url : URL.createObjectURL(file.file)}
              alt={file.name}
              className="w-40 h-40 object-cover rounded-lg"
            />
            <div className="text-sm text-gray-600">
              업로드 파일 : {file.name}
            </div>
            <div className="text-sm text-gray-600">
              파일 크기 : {file.file ? Math.floor(file.file.size / 1024) : 0}KB
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
