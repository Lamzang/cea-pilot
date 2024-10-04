"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export default function AnnouncementComponent() {
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
      setAnnouncements(announcementsData.slice(0, 3));
    };

    fetchAnnouncements();
  }, []);
  return (
    <div className="w-full mx-2 sm:w-2/3 mt-6 sm:mt-0 ">
      <div className="flex justify-between items-center border-b-2 border-black  pl-4 py-3  text-black">
        <div className="flex w-full justify-between">
          <div className="text-lg sm:text-2xl ml-2 text-blue-500 font-bold">
            공지사항 | 개정사항
          </div>
        </div>

        <Link
          href="/notice-board"
          className="text-black w-20 font-bold hover:underline"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#004cff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M6 12H18M12 6V18"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </Link>
      </div>
      <div className=" w-full overflow-y-auto ">
        {announcements.map((announcement) => (
          <Link
            href={`notice-board/${announcement.id}`}
            key={announcement.id}
            className="p-4 px-6 border-b border-gray-300 hover:bg-gray-100 flex flex-col"
          >
            <div className="font-semibold text-lg text-gray-700">
              {announcement.title}
            </div>
            <div className="text-sm text-gray-500 flex justify-end">
              {new Date(
                announcement.createdAt.seconds * 1000
              ).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
