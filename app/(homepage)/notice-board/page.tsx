"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import Link from "next/link";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRecoilState } from "recoil";
import { userDocState } from "@/lib/recoil/auth";

interface Announcement {
  id: string;
  title: string;
  tag?: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [user, setUser] = useRecoilState(userDocState);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const q = query(
        collection(db, "announcements"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      let announcementsData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Announcement, "id">;
        return {
          id: doc.id,
          ...data,
        };
      });
      if (
        user?.membershipType &&
        user.membershipType !== "정회원" &&
        user.membershipType !== "관리자"
      ) {
        announcementsData = announcementsData.filter(
          (announcement) => announcement.tag !== "정회원"
        );
      }
      if (user === null) {
        announcementsData = announcementsData.filter(
          (announcement) => announcement.tag !== "정회원"
        );
      }
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
              <h2 className="text-base mb-2 p-2 flex items-center">
                {announcement.tag ? (
                  <div className="px-4 py-1 border rounded-2xl mr-3 bg-blue-500 text-white">
                    {announcement.tag}
                  </div>
                ) : null}
                {announcement.title}
              </h2>

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
