"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userDocState } from "@/lib/recoil/auth";

export default function Page({
  params,
}: {
  params: { announcementId: string };
}) {
  const [announcement, setAnnouncement] = useState<any>(null);
  const user = useRecoilValue(userDocState);

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

  const createHyperlinks = (text: string) => {
    // Regular expression to detect URLs in the text, including paths (with /) and avoiding surrounding parentheses
    const urlRegex = /(https?:\/\/[^\s()<>]+(?:\/[^\s()<>]*)?)/g;

    // Replace the URLs with anchor tags
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>`;
    });
  };

  if (!announcement) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl sm:mx-auto sm:p-6 p-2 flex flex-col bg-white rounded-lg ">
      <h1 className="sm:text-3xl text-2xl mt-5 font-bold mb-6 ">
        {announcement.title}
      </h1>
      <div className="border-4 p-4 rounded-md ">
        {/* Render the content with hyperlinks */}
        <div
          className="w-full h-40 overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: createHyperlinks(announcement.content),
          }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-4 text-right">
        작성일:{" "}
        {new Date(announcement.createdAt.seconds * 1000).toLocaleDateString()}
      </p>
      {announcement.fileUrls.length > 0 && (
        <div>
          <div className="text-xl font-bold sm:ml-10 ml-2 mt-5">
            파일 다운로드
          </div>
          <div className="w-full pt-2 sm:ml-10 ml-2 flex flex-col gap-2">
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
          href={"/notice-board"}
          className="border w-fit mt-10 px-4 py-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-600"
        >
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
