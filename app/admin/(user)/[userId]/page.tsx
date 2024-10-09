"use client";

import { auth, db } from "@/lib/firebase/firebase";
import { updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminUserDetail({
  params,
}: {
  params: { userId: string };
}) {
  const [userData, setUserData] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>([]);
  const [membership, setMembership] = useState("");

  const onChange = (e: any) => {
    setMembership(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", params.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    const fetchOrderData = async () => {
      const querysnapshots = await getDocs(
        collection(db, "users", params.userId, "orders")
      );
      querysnapshots.forEach((doc) => {
        setOrderData((prev: any) => [...prev, doc.data()]);
      });
    };
    fetchData();
    fetchOrderData();
  }, [params.userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const onSubmit = async () => {
    const docRef = doc(db, "users", params.userId);
    updateDoc(docRef, {
      membershipType: membership,
    });
    setUserData({ ...userData, membershipType: membership });
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md pb-20">
      <div className="text-2xl font-bold mb-4">User Details</div>
      <div className="grid grid-cols-2 gap-4 mb-6 w-1/3">
        <div className="font-semibold">User Name:</div>
        <div>{userData.username}</div>
        <div className="font-semibold">Phone Number:</div>
        <div>{userData.phoneNumber}</div>
        <div className="font-semibold">Email:</div>
        <div>{userData.email}</div>
        <div className="font-semibold">other email:</div>
        <div>{userData.schoolEamil}</div>
        <div className="font-semibold">UID:</div>
        <div>{userData.uid}</div>
        <div className="font-semibold">Address:</div>
        <div>{userData.address}</div>
        <div className="font-semibold">major:</div>
        <div>{userData.major}</div>
        <div className="font-semibold">school:</div>
        <div>{userData.school}</div>
        <div className="font-semibold">교사 신분증:</div>
        <Link href={userData?.fileUrl ?? ""}>
          {userData.file ? "파일 다운로드" : "파일 없음"}
        </Link>
        <div className="font-semibold">자격 관련 서류:</div>
        <Link href={userData?.fileQualifyUrl ?? ""}>
          {userData.fileQualifyUrl ? "파일 다운로드" : "파일 없음"}
        </Link>
        <div className="font-semibold">설문조사:</div>
        <div>
          {userData?.options.map((data: any, index: any) => (
            <div key={index}>{data}</div>
          ))}
          <div>{userData?.optionETC}</div>
        </div>
      </div>
      <div className="mt-8 mb-10 w-1/3">
        <h2 className="text-2xl font-semibold mb-4">멤버십 변경하기</h2>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <div className="mb-4">
            <span className="font-semibold">현재 멤버십:</span>
            <span className="ml-2">{userData.membershipType}</span>
          </div>
          <div className="mb-6">
            <label htmlFor="membership" className="block font-semibold mb-2">
              변경할 멤버십:
            </label>
            <select
              onChange={onChange}
              id="membership"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            >
              <option value="일반회원">일반회원</option>
              <option value="준회원">준회원</option>
              <option value="정회원">정회원</option>
              <option value="멤버">멤버</option>
              <option value="관리자">관리자</option>
            </select>
          </div>
          <div className="text-right">
            <button
              onClick={onSubmit}
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>

      <div className="text-xl font-semibold mb-2">Order History</div>
      <div className="border-t-2 border-b-2 border-gray-300 py-2">
        <div className="grid grid-cols-5 gap-4 font-semibold bg-gray-200 p-2 rounded-md">
          <div>Product Name</div>
          <div>Each Price</div>
          <div>Quantity</div>
          <div>OrderDate</div>
          <div>Address</div>
        </div>
        {orderData?.map((data: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 p-2 border-b last:border-none"
          >
            <div>{data.products}</div>
            <div>{data.price}</div>
            <div>{data.totalAmount}</div>
            <div>{data.orderDate}</div>
            <div>{data.shippingAddress}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
