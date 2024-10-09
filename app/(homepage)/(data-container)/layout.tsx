"use client";

import { userDocState } from "@/lib/recoil/auth";
import Link from "next/link";
import { useRecoilState } from "recoil";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [userDoc, setUserDoc] = useRecoilState(userDocState);

  return (
    <div className="flex sm:flex-row flex-col min-h-screen">
      <div className="w-full sm:w-1/5 flex sm:flex-col justify-start border-b-2 sm:border-b-0 sm:border-r-2 border-gray-300">
        <Link
          href={"/data-container"}
          className="w-full flex justify-center font-bold text-2xl text-white bg-blue-800 hover:bg-blue-400 items-center h-28"
        >
          <div>자료마당</div>
        </Link>
        <Link
          href={"/data-container"}
          className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
        >
          자료실
        </Link>

        {!userDoc ||
        (userDoc?.membershipType !== "관리자" &&
          userDoc?.membershipType !== "정회원") ? null : (
          <Link
            href={"/projects"}
            className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
          >
            프로젝트
          </Link>
        )}
        <Link
          href={"/data-container/article"}
          className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
        >
          협회정관
        </Link>
        <Link
          href={"/data-container/individual-agreement"}
          className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
        >
          개인정보동의서
        </Link>
        <Link
          href={"/data-container/policy"}
          className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
        >
          학문적 윤리 정책
        </Link>
      </div>
      <div className="w-4/5 p-4">{children}</div>
    </div>
  );
}
