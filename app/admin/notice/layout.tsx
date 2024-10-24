"use client";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
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
    <div className="flex w-full h-full m-0">
      <div className="flex w-full h-full">
        <div className="w-1/5 h-full border-r border-gray-300 bg-gray-50 p-4 flex flex-col">
          <Link
            href={"/admin/notice"}
            className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2"
          >
            Manage Notice
          </Link>

          <div className="ml-4 flex flex-col gap-5">
            {announcements.map((announcement) => (
              <Link
                href={`/admin/notice/${announcement.id}`}
                key={announcement.id}
              >
                <div className="py-1 text-gray-700 hover:underline">
                  {announcement.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-4/5 h-full flex-grow border-l border-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
}
