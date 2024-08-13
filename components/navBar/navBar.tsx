"use client";

import Image from "next/image";
import Link from "next/link";
import AuthBtn from "../btn/authBtn";
import { useRecoilValue } from "recoil";
import { authState } from "@/lib/recoil/auth";
import LogoutBtn from "../btn/logoutBtn";
import ProfileBtn from "../btn/profileBtn";
import Detaiednavbar from "./detail";
import { useState } from "react";

const Navbar = () => {
  const isLogin = useRecoilValue(authState).isLoggedIn;
  const [isDetail, setIsDetail] = useState(false);
  return (
    <div className="">
      <div className="flex justify-center">
        <div className="w-[1100px] px-16 cursor-grab">
          {isLogin ? (
            <div className="flex w-full justify-end">
              <div className="flex">
                <LogoutBtn />
                <Link href="/mypage">마이페이지</Link>
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-end items-center text-sm h-8">
              <div className="flex mr-5 gap-3">
                <Link className="hover:text-orange-500" href="/login">
                  로그인
                </Link>
                <Link className="hover:text-orange-500" href="/create-account">
                  회원가입
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className=" flex justify-center w-screen bg-slate-50 border border-b-gray-200">
        <nav className="cursor-grab w-[1100px] h-24 flex items-center justify-between box-border">
          <div className="flex items-center w-1/4">
            <Link href="/" className="w-[50px] m-2">
              <Image
                src={"/assets/logo.png"}
                alt="로고"
                width={50}
                height={50}
              />
            </Link>

            <Link href="/" className="m-2">
              <div className="text-black text-xl font-bold w-max">
                한국개념기반교육협회
              </div>
            </Link>
          </div>
          <div
            className="flex items-center justify-between px-10 w-3/4 h-full"
            onClick={() => setIsDetail((prev) => !prev)}
          >
            <div className="text-black m-4 w-1/6 flex ">협회소개</div>
            <div className="text-black m-4 w-1/6 flex ">공지사항</div>
            <div className="text-black m-4 w-1/6 flex ">고객문의</div>
            <div className="text-black m-4 w-1/6 flex ">후원하기</div>
            <div className="text-black m-4 w-1/6 flex ">쇼핑하기</div>
            <div className="text-black m-4 w-1/6 flex ">자료실</div>
          </div>
        </nav>
        {isDetail && <Detaiednavbar setIsDetail={setIsDetail} />}
      </div>
    </div>
  );
};

export default Navbar;
