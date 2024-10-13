"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Link from "next/link";

export default function Page({ params }: { params: { dataID: string } }) {
  const [announcement, setAnnouncement] = useState<any>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const docRef = await doc(db, "reference", params.dataID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAnnouncement(docSnap.data());
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchAnnouncement();
  }, [params.dataID]);

  if (!announcement) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold ml-1 sm:ml-8 border-b-2 pb-6 mt-6 mb-4">
        자료실- {announcement.title}
      </h1>
      <div className="p-2 sm:p-6 bg-white rounded-lg ">
        <div className="p-2 sm:p-4 rounded-md shadow-sm">
          <Editor
            editorState={EditorState.createWithContent(
              convertFromRaw(announcement.content)
            )}
            readOnly
            toolbarHidden
            wrapperClassName="wrapper-class"
            editorClassName="editor-class p-2 min-h-[150px] border border-gray-300 rounded-md"
            toolbarClassName="toolbar-class"
          />
        </div>
        <p className="text-sm text-gray-500 mt-4 text-right">
          작성일:{" "}
          {new Date(announcement.createdAt.seconds * 1000).toLocaleDateString()}
        </p>
      </div>
      {announcement.fileUrls && (
        <div>
          <div className="text-xl font-bold ml-2 sm:ml-10">파일 다운로드</div>
          <div className="w-full pt-2 ml-2 sm:ml-10 flex flex-col gap-2">
            {announcement.fileUrls?.map((data: any, index: any) => (
              <div key={index} className=" w-fit px-1">
                <Link className="hover:text-red-400 flex gap-1" href={data}>
                  <img
                    src="/assets/svg/download.svg"
                    className="w-6 h-6"
                    alt="downloadsvg"
                  />
                  {announcement.fileNames[index]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full flex justify-end">
        <Link
          href={"/data-container"}
          className="border w-fit mt-10 px-4 py-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-600"
        >
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
