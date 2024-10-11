"use client";

import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querysnapshots = await getDocs(collection(db, "users"));
      querysnapshots.forEach((doc) => {
        setUserData((prev: any) => [...prev, doc.data()]);
      });
      console.log(querysnapshots);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="text-2xl font-bold mb-4">유저 목록</div>
      <div>
        <div className="grid grid-cols-5 gap-6 py-2 px-2 bg-gray-200 rounded-md">
          <div className="font-semibold">User Name</div>
          <div className="font-semibold">Phone Number</div>
          <div className="font-semibold">Email</div>
          <div className="font-semibold">Membership</div>
          <div className="font-semibold">Actions</div>
        </div>
        {userData.map((data: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-6 px-2 py-2 border-b"
          >
            <div>{data.username}</div>
            <div>{data?.phoneNumber}</div>
            <div>{data.email}</div>
            <div>{data?.membershipType}</div>
            <Link
              className="bg-black text-white py-1 px-3 rounded hover:bg-gray-500"
              href={`/admin/${data.uid}`}
            >
              상세관리하기
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
