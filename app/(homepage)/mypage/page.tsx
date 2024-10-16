"use client";

import { IUserDoc } from "@/constant/interface";
import checkPhoneNum from "@/lib/checkPhoneNum";
import { auth, db } from "@/lib/firebase/firebase";
import { authState, userDocState } from "@/lib/recoil/auth";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const MyPage = () => {
  const [userData, setUserDoc] = useRecoilState(userDocState);

  return (
    <div className="flex justify-center flex-col h-full items-center">
      <div className="font-bold text-3xl m-10">마이페이지</div>
      <div className="flex w-2/3 gap-16 flex-wrap">
        <div className="w-full p-10 border-2 border-gray-300 my-7 flex justify-between flex-wrap rounded-lg shadow-md">
          <div className="flex mb-10">
            <div className="flex flex-col gap-2 h-36 justify-between">
              <div className="text-2xl">
                <span className="font-bold">{userData?.username}</span>님은 현재{" "}
                <span className="font-bold">{userData?.membershipType} </span>
                입니다.
              </div>
              <div>이메일 : {userData?.email}</div>
              <div>
                개인 휴대폰번호 : {checkPhoneNum(userData?.phoneNumber)}
              </div>
              <Link
                href={"mypage/edit-profile"}
                className="text-blue-500 cursor-pointer"
              >
                회원정보수정
              </Link>
            </div>
          </div>

          {/* <div className="w-full flex gap-8 justify-center">
            <div className="w-20 h-full flex flex-col items-center justify-center gap-4 font-medium">
              <div>쿠폰</div>
              <div>0개</div>
            </div>
            <div className="w-20 h-full flex flex-col items-center justify-center gap-4 font-medium">
              <div>포인트</div>
              <div>0P</div>
            </div>
            <div className="w-20 h-full flex flex-col items-center justify-center gap-4 font-medium">
              <div>적립금</div>
              <div>0원</div>
            </div>
          </div> */}
        </div>

        {/* <div className="w-full p-10 border-2 border-gray-300 my-7 py-10 rounded-lg shadow-md">
          <div className="text-xl font-semibold mb-4">주문/배송</div>
          <div className="space-y-4">
            {orderData.map((order: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>{order.products}</div>
                <div>{order.status}</div>
                <div>{order.orderDate}</div>
                <div>{order.shippingAddress}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full p-10 border-2 border-gray-300 my-7 py-10 rounded-lg shadow-md">
          <div className="text-xl font-semibold">기타</div>
           Add additional content here 
        </div> */}
      </div>
    </div>
  );
};

export default MyPage;
