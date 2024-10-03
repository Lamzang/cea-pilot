import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex bg-black w-[calc(100vw-17px)] min-h-28 text-white justify-center p-8">
      {/* <nav className="flex gap-5 py-3">
        <Link href="/">회사소개</Link>
        <Link href="/shop">쇼핑몰</Link>
        <Link href="/">공지사항</Link>
      </nav> */}
      <div className="w-[1100px]">
        <div className=" flex">
          <div className="flex flex-col w-1/3">
            <div className="text-2xl py-1">About Us</div>
            <div>상호명 : 한국개념기반교육협회</div>
            <div>대표자 : 신은정</div>
            <div>개인정보 관리자 : 신은정 & 김병일</div>
            <div>고유번호 : 116-82-73255</div>
          </div>
          <div className="flex flex-col w-1/3">
            <div className="text-2xl py-1">Contact Us</div>
            <div>주소: 부산 기장군 기장읍 내리 소정안길 4-27 </div>
            <div>이메일: graceshinnz@gmail.com</div>
            <div>이메일: http05@gmail.com </div>
          </div>
          <div>
            <div className="text-2xl py-1">SNS</div>
            <Link
              className="flex gap-2"
              href={"https://www.facebook.com/groups/337483832687824"}
            >
              <div className="w-8 h-8">
                <img src="/assets/svg/facebook.svg" />
              </div>
              Facebook 바로가기
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
