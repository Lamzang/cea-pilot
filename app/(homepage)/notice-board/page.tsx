"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import Link from "next/link";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AnnouncementsPage: React.FC = () => {
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
    <div className="">
      <h1 className="text-3xl font-bold ml-1 sm:ml-8 border-b-2 pb-6 mt-6 mb-10">
        공지사항
      </h1>
      <div className="m-2 sm:mx-16 pt-10">
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
};

export default AnnouncementsPage;
