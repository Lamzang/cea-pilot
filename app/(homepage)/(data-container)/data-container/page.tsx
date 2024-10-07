"use client";

import { useEffect, useState } from "react";
import AnnouncementsPage from "../../notice-board/page";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import Link from "next/link";

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
      <h1 className="text-3xl font-bold  ml-8 border-b-2 pb-6 mt-6 mb-10">
        자료실
      </h1>
      <div className="mx-16 pt-10">
        {announcements.map((announcement) => (
          <Link href={`/notice-board/${announcement.id}`} key={announcement.id}>
            <div className="bg-gray-100 border-gray-300 border-b-2 p-4   hover:bg-gray-200">
              <h2 className="text-base mb-2 p-2">{announcement.title}</h2>

              <p className="text-sm text-gray-500">
                관리자 | 작성일:{" "}
                {new Date(
                  announcement.createdAt.seconds * 1000
                ).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
