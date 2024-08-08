"use client";

import React, { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function Page({ params }: { params: { noticeId: string } }) {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState<string>("");
  const [announcement, setAnnouncement] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const docRef = doc(db, "announcements", params.noticeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAnnouncement(data);
          setTitle(data.title);
          const contentState = convertFromRaw(data.content);
          setEditorState(EditorState.createWithContent(contentState));
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

  const onEditorStateChange = useCallback(
    (newEditorState: EditorState): void => {
      setEditorState(newEditorState);
    },
    []
  );

  const saveToFirestore = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    try {
      await setDoc(doc(db, "announcements", params.noticeId), {
        title: title,
        content: rawContentState,
        createdAt: new Date(),
      });
      alert("공지사항이 성공적으로 저장되었습니다!");
      router.push("/admin/notice");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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
      <input
        type="text"
        placeholder="제목을 입력하세요"
        onChange={onChange}
        value={title}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class mb-4"
        editorClassName="editor-class bg-gray-100 p-4 min-h-[200px] border border-gray-300 rounded-md"
        toolbarClassName="toolbar-class mb-4"
      />
      <button
        onClick={saveToFirestore}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        저장하기
      </button>
    </div>
  );
}
