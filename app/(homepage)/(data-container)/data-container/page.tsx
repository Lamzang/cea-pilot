"use client";

import { useEffect, useState } from "react";
import AnnouncementsPage from "../../notice-board/page";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { authState } from "@/lib/recoil/auth";

export default function Page() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const user = useRecoilValue(authState);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const q = query(
        collection(db, "reference"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const announcementsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnnouncements(announcementsData);
    };

    fetchAnnouncements();
  }, []);
  return (
    <div>
      <div className="flex ml-1 sm:ml-8 border-b-2 justify-between items-center pb-6 mt-6 mb-10">
        <h1 className="text-3xl font-bold  ">자료실</h1>
        <Link
          className="text-base border rounded-full px-4 bg-blue-500 text-white py-1 hover:bg-blue-600"
          href="/data-container/editor"
        >
          글쓰기
        </Link>
      </div>

      <div className="m-2 sm:mx-16 pt-4 sm:pt-10">
        {announcements.map((announcement) => (
          <Link
            href={`/data-container/${announcement.id}`}
            key={announcement.id}
          >
            <div className="bg-gray-100 border-gray-300 border-b-2 p-4   hover:bg-gray-200">
              <h2 className="text-base mb-2 p-2">{announcement.title}</h2>

              <p className="text-sm text-gray-500">
                {announcement.author ? announcement.author : "관리자"} | 작성일:{" "}
                {new Date(
                  announcement.createdAt.seconds * 1000
                ).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
        {announcements.length === 0 && <div>게시글이 없습니다.</div>}
        <div className="text-red-400 mt-20">
          * 참고: 기본적인 자료는 올 해 말까지 구성할 예정입니다. 고로 년 가입
          기간은 2025년 1월부터 카운팅 들어갑니다.
          <br /> 내년부터는 새로 생성되는 자료도 기대해 주세요.
        </div>
      </div>
    </div>
  );
}
