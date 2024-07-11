"use client";

import Image from "next/image";
import Link from "next/link";
import Detaiednavbar from "./detail";
import AuthBtn from "../btn/authBtn";

const Navbar = () => {
  return (
    <nav className="p-4 bg-slate-50 border border-b-gray-200 fixed w-screen h-24 flex items-center px-14 justify-between box-border">
      <ul className="flex items-center">
        <li className="m-2">
          <Link href="/">
            <Image src={"/assets/logo.png"} alt="로고" width={50} height={50} />
          </Link>
        </li>
        <li className="m-2">
          <Link href="/">
            <div className="text-black text-xl font-bold">
              한국개념기반교육협회
            </div>
          </Link>
        </li>
      </ul>
      <ul className="flex items-center">
        <li id="navbar-introduce" className="m-4 relative">
          <Link href="/">
            <div className="text-black">{"협회소개"}</div>
          </Link>
          <Detaiednavbar
            id="detailed-introduce"
            contentArray={["소개", "조직도", "오시는길"]}
          />
        </li>
        <li className="m-4">
          <Link href="/project-room">
            <div className="text-black">프로젝트</div>
          </Link>
        </li>
        <li className="m-4">
          <Link href="/notice-board">
            <div className="text-black">공지사항</div>
          </Link>
        </li>
        <li className="m-4">
          <Link href="/contact">
            <div className="text-black">후원하기</div>
          </Link>
        </li>
        <li className="m-2">
          <AuthBtn type="login" />
        </li>
        <li className="m-2">
          <AuthBtn type="create-account" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
