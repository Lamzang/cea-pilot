"use client";

import { userDocState } from "@/lib/recoil/auth";
import { useRecoilState } from "recoil";

export default function Page() {
  const [userDoc, setUserDoc] = useRecoilState(userDocState);
  if (
    !userDoc ||
    (userDoc?.membershipType !== "관리자" &&
      userDoc?.membershipType !== "정회원")
  ) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-xl font-bold mb-6 text-center">
          정회원 전용 자료실입니다.
        </h1>
      </div>
    );
  }
  return <div>Projects</div>;
}
