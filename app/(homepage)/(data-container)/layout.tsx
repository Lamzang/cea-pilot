"use client";

import { userDocState } from "@/lib/recoil/auth";
import Link from "next/link";
import { useRecoilState } from "recoil";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [userDoc, setUserDoc] = useRecoilState(userDocState);

  return (
    <div className="flex sm:flex-row flex-col min-h-screen">
      <div className="sm:w-1/5 w-full flex sm:flex-col justify-start border-b-2 sm:border-b-0 sm:border-r-2 border-gray-300 p-4 bg-gray-100 gap-2">
        <Link
          href={"/data-container"}
          className="w-full flex justify-center font-bold hover:bg-gray-200 items-center rounded-full h-10"
        >
          자료실
        </Link>
        <Link
          href={"/gallery"}
          className="w-full flex justify-center hover:bg-gray-200 items-center rounded-full h-10"
        >
          갤러리
        </Link>
        {!userDoc ||
        (userDoc?.membershipType !== "관리자" &&
          userDoc?.membershipType !== "정회원") ? null : (
          <Link
            href={"/projects"}
            className="w-full flex justify-center hover:bg-gray-200 items-center rounded-full h-10"
          >
            프로젝트
          </Link>
        )}
      </div>
      <div className="w-4/5 p-4">{children}</div>
    </div>
  );
}
