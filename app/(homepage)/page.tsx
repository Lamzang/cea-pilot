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
      setAnnouncements(announcementsData.slice(0, 3));
    };

    fetchAnnouncements();
  }, []);

  return (
    <main className="flex flex-col m-0 p-0 overflow-hidden w-full">
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

      <div className="flex flex-col sm:flex-row h-auto sm:h-auto mt-10 px-4 justify-between">
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

        <div className="w-full sm:w-1/3 mx-2 sm:ml-5 mt-6 sm:mt-0 rounded-2xl">
          <div className="text-xl sm:text-2xl font-bold border-b-2 border-black w-full text-blue-500 mt-8 pb-8">
            진행예정행사
          </div>
          <div className="space-y-2 w-full flex justify-center items-center">
            {/* <img
              className="mt-4 w-full h-full rounded-2xl"
              src="/assets/mainTitle/background3.jpg"
            /> */}
            <span className="mt-10">진행예정 행사 없음</span>
          </div>
        </div>
      </div>
      <div className="w-full sm:h-[400px] p-8">
        <div className="w-full sm:w-full mx-2 sm:ml-5  sm:mt-0 rounded-2xl">
          <div className="text-xl sm:text-2xl font-bold border-b-2 border-black w-full text-blue-500 mt-8 pb-8">
            주요 활동
          </div>
          <div className="space-y-2 w-full flex justify-center items-center">
            {/* <img
              className="mt-4 w-full h-full rounded-2xl"
              src="/assets/mainTitle/background3.jpg"
            /> */}
            <span className="mt-10">주요활동 내용 들어갈 공간</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full pl-10 sm:flex-row  h-auto sm:h-[500px] ">
        {/* 상담하기 섹션 */}
        <div className="w-full border-8 rounded-3xl sm:w-1/3 h-48 sm:h-[400px] mt-4 justify-center items-center text-lg font-bold text-gray-800">
          <h2 className="pl-8 py-2 font-bold rounded-t-2xl text-xl bg-blue-500 text-white  ">
            간편 상담 서비스
          </h2>
          <form className="bg-white   px-8 pt-6 pb-8   w-full max-w-md">
            {/* Title Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-1"
                htmlFor="title"
              >
                상담제목
              </label>
              <input
                id="title"
                type="text"
                placeholder="상담제목"
                className=" appearance-none border rounded w-full text-base py-2 px-3 text-gray-700 leading-tight  "
              />
            </div>

            {/* Content Editable Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                상담내용
              </label>
              <textarea
                id="description"
                placeholder="상담 내용을 입력하세요"
                className="shadow appearance-none border text-base rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                상담하기
              </button>
            </div>
          </form>
        </div>

        {/* 후원하기 섹션 */}
        {/* 첫 번째 그리드 섹션 */}
        <div className="w-full sm:w-2/3 mt-4 border-8 rounded-3xl mx-6 h-48 sm:h-[400px]">
          <h2 className="pl-8 w-full font-bold text-xl p-2 rounded-t-2xl text-white bg-blue-500">
            바로가기 서비스
          </h2>
          <div className="h-48 sm:h-[340px] rounded-b-2xl  p-4 bg-gray-100">
            <div className="sm:h-full grid grid-cols-3 gap-4">
              <Link
                href="/introduce"
                className="flex flex-col gap-5 h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 p-4"
              >
                <div className="w-1/3 h-1/3">
                  <img src="/assets/svg/home.svg" />
                </div>
                <span className="text-lg">협회소개</span>
              </Link>
              <Link
                href="/create-account"
                className="flex flex-col gap-5 h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 p-4"
              >
                <div className="w-1/4 h-1/4">
                  <img src="/assets/svg/account.svg" />
                </div>
                <span className="text-lg">협회가입</span>
              </Link>
              <Link
                href="/introduce"
                className="flex flex-col gap-5 h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 p-4"
              >
                <div className="w-1/4 h-1/4">
                  <img src="/assets/svg/document.svg" />
                </div>
                <span className="text-lg">협회정관</span>
              </Link>
              <Link
                href="https://www.facebook.com/groups/337483832687824"
                className="flex flex-col gap-5 h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 p-4"
              >
                <div className="w-1/4 h-1/4">
                  <img src="/assets/svg/facebook.svg" />
                </div>
                <span className="text-lg">협회 SNS</span>
              </Link>
              <Link
                href="/shop"
                className="flex flex-col gap-5 h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 p-4"
              >
                <div className="w-1/3 h-1/3">
                  <img src="/assets/svg/cart.svg" />
                </div>
                <span>쇼핑하기</span>
              </Link>
              <Link
                href="/shop"
                className="flex flex-col gap-5 h-full bg-white justify-center hover:bg-gray-200 items-center border rounded-lg shadow-sm font-semibold text-gray-700 p-4"
              >
                <div className="w-1/3 h-1/3">
                  <img src="/assets/svg/papers.svg" />
                </div>
                <span>자료마당</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
