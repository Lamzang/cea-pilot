"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Page({
  params,
}: {
  params: { announcementId: string };
}) {
  const [announcement, setAnnouncement] = useState<any>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const docRef = doc(db, "announcements", params.announcementId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAnnouncement(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchAnnouncement();
  }, [params.announcementId]);

  if (!announcement) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg ">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {announcement.title}
      </h1>
      <div className="bg-gray-100 p-4 rounded-md shadow-sm">
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(announcement.content)
          )}
          readOnly
          toolbarHidden
          wrapperClassName="wrapper-class"
          editorClassName="editor-class bg-gray-100 p-2 min-h-[150px] border border-gray-300 rounded-md"
          toolbarClassName="toolbar-class"
        />
      </div>
      <p className="text-sm text-gray-500 mt-4 text-right">
        작성일:{" "}
        {new Date(announcement.createdAt.seconds * 1000).toLocaleDateString()}
      </p>
    </div>
  );
}
