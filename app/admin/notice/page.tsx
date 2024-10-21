"use client";

import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const q = query(
        collection(db, "announcements"),
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
      <div className="px-10 py-4 flex justify-between border-b-2 items-center">
        <div className="text-xl font-bold ">공지사항 관리하기</div>
        <Link
          href={"/admin/notice/editor"}
          className="p-2 my-2 border px-4 w-fit rounded-3xl bg-blue-500 text-white"
        >
          공지사항 생성하기
        </Link>
      </div>
      <div className="ml-4 flex flex-col gap-5 p-2">
        {announcements.map((announcement) => (
          <Link href={`/admin/notice/${announcement.id}`} key={announcement.id}>
            <div className=" text-gray-700 hover:bg-slate-100 p-2">
              {announcement.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
