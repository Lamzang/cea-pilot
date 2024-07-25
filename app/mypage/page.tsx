"use client";

import React from "react";

const NAME = "인재익";
const EMAIL = "test@naver.com";
const MEMBERSHIP = "VIP";

const MyPage = () => {
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
                <span className="font-bold">{NAME}</span>님은 현재{" "}
                <span className="font-bold">{MEMBERSHIP}</span>입니다.
              </div>
              <div>{EMAIL}</div>
              <div>회원정보수정</div>
            </div>
          </div>

          <div className="w-full flex gap-8 justify-center">
            <div className=" w-20 h-full flex flex-col items-center justify-center gap-4 font-medium">
              <div>쿠폰</div>
              <div>0장</div>
            </div>
            <div className=" w-20 h-full flex flex-col items-center justify-center gap-4 font-medium">
              <div>포인트</div>
              <div>0P</div>
            </div>
            <div className=" w-20 h-full flex flex-col items-center justify-center gap-4 font-medium">
              <div>적립금</div>
              <div>0원</div>
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

/**
 들어가야 할 내용
  // 1. 회원정보
  이름
  이메일
  현재 멤버쉽
  쿠폰
  포인트
  적립금

  2. 회원정보수정
  비밀번호 변경
  회원탈퇴
  닉네임 변경
  프로필 사진 변경
  주소 변경

  3. 주문/배송
  결제정보(결제이력)
  주문/배송조회(결제완료, 배송준비중, 배송중, 배송완료, 주문취소)
  상품후기
  상품문의
  1:1문의

  4. 기타
  FAQ
  QnA
  공지사항
  이벤트
  */

export default MyPage;
