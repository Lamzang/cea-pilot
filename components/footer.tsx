import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-black w-full min-h-28 text-white pb-8 ">
      <div className="flex sm:px-44 h-14 w-full justify-start items-center border-b-2 border-gray-700 mb-2">
        <Link className="" href={" https://www.edu-tribes.com/"}>
          트라이브
        </Link>
      </div>
      <div className="w-full sm:px-20 px-2 ">
        <div className=" flex sm:flex-row flex-col gap-5">
          <div className="flex flex-col sm:w-1/3 w-full">
            <div className="text-2xl py-1">About Us</div>
            <div>상호명 : 한국개념기반교육협회</div>
            <div>대표자 : 신은정</div>
            <div>개인정보 관리자 : 신은정 & 김병일</div>
            <div>고유번호 : 116-82-73255</div>
          </div>
          <div className="flex flex-col sm:w-1/3 w-full">
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
