"use client";

import { db } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const NAME = "인재익";
const EMAIL = "test@naver.com";
const MEMBERSHIP = "VIP";

const MyPage = () => {
  const [user, setUser] = useRecoilState(authState);
  const [userData, setUserData] = React.useState<any>({});
  useEffect(() => {
    getDoc(doc(db, "users", user.user.uid))
      .then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          console.log(data);
          setUserData(data);
          console.log("Document data:", data);
        } else {
          //error handling 추가
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);
  return (
    <div className="flex justify-center flex-col h-screen items-center">
      <div className="font-bold text-3xl">마이페이지</div>
      <div className="flex w-2/3 gap-16 flex-wrap">
        <div className="w-2/5 border-y-2 border-black my-7 py-10 flex justify-between flex-wrap">
          <div className="flex mb-10">
            <img
              className="w-20 h-20 mr-10 rounded-full"
              alt="profile imagze"
              src={"/assets/profile_example.png"}
            />
            <div className="flex flex-col h-28 justify-between">
              <div className="text-2xl">
                <span className="font-bold">{userData.username}</span>님은 현재{" "}
                <span className="font-bold">{userData.membership}</span>입니다.
              </div>
              <div>{userData.email}</div>
              <div>uid : {userData.uid}</div>
              <div>{userData.address === "" ? null : userData.address}</div>
              <div>회원정보수정</div>
            </div>
          </div>

          <div className="w-full flex gap-8 justify-center">
            <div className=" w-20 h-full flex flex-col items-center justify-center gap-4 font-medium">
              <div>쿠폰</div>
              <div>{userData.coupons.coupons.length}개</div>
            </div>
            <div className=" w-20 h-full flex flex-col items-center justify-center gap-4 font-medium">
              <div>포인트</div>
              <div>{userData.coupons?.points}P</div>
            </div>
            <div className=" w-20 h-full flex flex-col items-center justify-center gap-4 font-medium">
              <div>적립금</div>
              <div>{userData.coupons?.accumulated}원</div>
            </div>
          </div>
        </div>
        {/* <div className="w-2/5 border-y-2 border-black my-7 py-10 flex justify-between flex-wrap">
          회원정보수정
        </div> */}
        <div className="w-2/5 border-y-2 border-black my-7 py-10 flex justify-between flex-wrap">
          주문/배송
        </div>
        <div className="w-2/5 border-y-2 border-black my-7 py-10 flex justify-between flex-wrap">
          기타
        </div>
      </div>
    </div>
  );
};

export default MyPage;
