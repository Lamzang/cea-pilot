import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex-col bg-black w-full min-h-28 text-white justify-center p-8">
      {/* <nav className="flex gap-5 py-3">
        <Link href="/">회사소개</Link>
        <Link href="/shop">쇼핑몰</Link>
        <Link href="/">공지사항</Link>
      </nav> */}
      <div className=" flex">
        <div className="flex flex-col w-1/3">
          <div className="text-2xl py-1">About Us</div>
          <div>상호명 :</div>
          <div>대표자 : </div>
          <div>개인정보 관리자 : </div>
          <div>사업자 등록번호 : </div>
          <div>통신판매업 신고번호 : </div>
        </div>
        <div className="flex flex-col w-1/3">
          <div className="text-2xl py-1">Contact Us</div>
          <div>Address: 사업장 주소</div>
          <div>Email: 이메일</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
