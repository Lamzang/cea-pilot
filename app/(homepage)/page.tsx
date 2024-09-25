"use client";

import AuthBtn from "@/components/btn/authBtn";
import { useState, useEffect } from "react";
import "./animation.css";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import Link from "next/link";

export default function Home() {
  const mainImages: string[] = [
    "/assets/mainTitle/background3.jpg",
    "/assets/mainTitle/background2.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === mainImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsFading(false);
      }, 7000); // Duration of the fade out
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentImageIndex, mainImages.length]);

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
    <main className="flex flex-col box-border m-0 p-0 overflow-x-hidden w-full">
      <div>
        {mainImages.length > 0 && (
          <>
            <div
              className={`absolute w-[calc(100vw-17px)] left-0 h-[300px] sm:h-[500px] flex justify-center items-center`}
              style={{
                zIndex: -1000,
                backgroundImage: `url("/assets/mainTitle/background3.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full h-full bg-black bg-opacity-20"></div>
            </div>
            <div
              className={`absolute w-[calc(100vw-17px)] left-0 h-[300px] sm:h-[500px] flex justify-center items-center image-container
                transition-opacity duration-500 ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
              style={{
                zIndex: -50,
                backgroundImage: `url("/assets/mainTitle/background2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full h-full bg-black bg-opacity-20"></div>
            </div>
            <div className="flex justify-center items-center flex-col h-[300px] sm:h-[500px] z-50">
              <div className="text-2xl sm:text-4xl font-bold text-white">
                한국개념기반교육협회
              </div>
              <div className="text-white text-sm sm:text-base">
                Korea Concept-Based Education Association
              </div>
              <div className="flex gap-4 sm:gap-10 text-base sm:text-lg mt-3 sm:mt-5">
                <AuthBtn addCSS="px-2 sm:px-4" type="login" />
                <AuthBtn addCSS="px-2 sm:px-4" type="create-account" />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row h-auto sm:h-[350px] mt-10 px-4 justify-between">
        <div className="w-full sm:w-[300px] h-full">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="border-b-2 border-gray-500 w-full sm:w-5/6"></div>
            <Link
              href="/shop"
              className="border-b-2 border-gray-500 hover:bg-gray-100 w-full sm:w-5/6 h-[60px] sm:h-[80px] flex justify-center items-center text-lg sm:text-xl"
            >
              쇼핑하기
            </Link>
            <Link
              href="/classroom"
              className="border-b-2 border-gray-500 hover:bg-gray-100 w-full sm:w-5/6 h-[60px] sm:h-[80px] flex justify-center items-center text-lg sm:text-xl"
            >
              연수하기
            </Link>
            <Link
              href="/data-container"
              className="border-b-2 border-gray-500 hover:bg-gray-100 w-full sm:w-5/6 h-[60px] sm:h-[80px] flex justify-center items-center text-lg sm:text-xl"
            >
              자료실
            </Link>
            <Link
              href="/donation"
              className="border-b-2 border-gray-500 hover:bg-gray-100 w-full sm:w-5/6 h-[60px] sm:h-[80px] flex justify-center items-center text-lg sm:text-xl"
            >
              후원하기
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-[300px] mt-6 sm:mt-0">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <Link
              href={"/announcements"}
              className="text-xl sm:text-2xl font-bold"
            >
              공지사항
            </Link>
            <Link
              href="/announcements"
              className="text-blue-500 hover:underline"
            >
              더보기
            </Link>
          </div>
          <div className="space-y-2 w-full">
            {announcements.map((announcement) => (
              <Link
                href={`notice-board/${announcement.id}`}
                key={announcement.id}
                className="p-1 border-gray-500 hover:bg-gray-100 w-full flex justify-between items-center"
              >
                <div>- {announcement.title}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full sm:w-[300px] mt-6 sm:mt-0">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <Link href={"/gallery"} className="text-xl sm:text-2xl font-bold">
              갤러리
            </Link>
            <Link
              href="/announcements"
              className="text-blue-500 hover:underline"
            >
              더보기
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full h-auto sm:h-[300px] ">
        {/* 첫 번째 그리드 섹션 */}
        <div className="w-full sm:w-1/2 h-48 sm:h-full bg-gray-200 grid grid-cols-2 ">
          <div className="flex justify-center items-center bg-mainBlue-light font-semibold text-gray-700">
            협회소개
          </div>
          <div className="flex justify-center items-center bg-mainBlue-default font-semibold text-gray-700">
            협회가입
          </div>
          <div className="flex justify-center items-center  font-semibold text-gray-700">
            협회 정관
          </div>
          <div className="flex justify-center items-center bg-mainBlue-light font-semibold text-gray-700">
            협회 SNS
          </div>
        </div>

        {/* 상담하기 섹션 */}
        <div className="w-full sm:w-1/2 h-48 sm:h-full bg-gray-300 flex justify-center items-center text-lg font-bold text-gray-800">
          상담하기
        </div>

        {/* 후원하기 섹션 */}
        <div className="w-full sm:w-1/2 h-48 sm:h-full bg-gray-300 flex justify-center items-center text-lg font-bold text-gray-800">
          후원하기
        </div>
      </div>
    </main>
  );
}
