"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

import { useRecoilValue } from "recoil";
import { authState } from "@/lib/recoil/auth";
import { useRouter } from "next/navigation";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const RichTextExample: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState<string>("");
  const user = useRecoilValue(authState);
  const router = useRouter();

  const onEditorStateChange = (newEditorState: EditorState): void => {
    setEditorState(newEditorState);
  };

  const saveToFirestore = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    try {
      await addDoc(collection(db, "study-architecture"), {
        title: title,
        content: rawContentState,
        author: user?.displayName ?? "익명",
        createdAt: new Date(),
      });
      alert("저장되었습니다.");
    } catch (e) {
      console.error("문제가 발생하였습니다: ", e);
    }
    setEditorState(EditorState.createEmpty());
    setTitle("");
    router.push("/study-architecture");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-1 sm:mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">새 글 쓰기</h1>
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
        editorClassName="editor-class p-4 min-h-[200px] border border-gray-300 rounded-md"
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
};

export default RichTextExample;
