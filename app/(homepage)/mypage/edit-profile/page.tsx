"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { authState } from "@/lib/recoil/auth";
import { useRouter } from "next/navigation";
import { set } from "firebase/database";
import { IUserDoc } from "@/constant/interface";

export default function EditProfile() {
  const [user, setUser] = useRecoilState(authState);
  const [userData, setUserData] = useState<IUserDoc>();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getDoc(doc(db, "users", user.uid)).then((doc) => {
        if (doc.exists()) {
          setUserData(doc.data() as IUserDoc);
        }
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user && userData) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, userData as { [x: string]: any });
        router.push("/");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            이름
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData?.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            개인 이메일 주소
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData?.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            전화번호
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={userData?.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="schoolEmail"
            className="block text-sm font-medium text-gray-700"
          >
            직장/다른 이메일 주소
          </label>
          <input
            type="text"
            id="schoolEmail"
            name="schoolEmail"
            value={userData?.schoolEmail}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        {userData?.membershipType === "준회원" ||
        userData?.membershipType === "정회원" ? (
          <div className="space-y-6 mb-10">
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                소속 지역 교육청
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={userData?.region}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="school"
                className="block text-sm font-medium text-gray-700"
              >
                학교 이름 또는 교육 기관 이름
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={userData?.school}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="major"
                className="block text-sm font-medium text-gray-700"
              >
                전공 또는 학년
              </label>
              <input
                type="text"
                id="major"
                name="major"
                value={userData?.major}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        ) : null}

        <div className="py-10">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            변경사항 저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
