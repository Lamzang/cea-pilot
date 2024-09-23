"use client";

import Image from "next/image";
import Link from "next/link";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "@/lib/recoil/auth";
import LogoutBtn from "../btn/logoutBtn";

import { useState, useEffect } from "react";
import Detaiednavbar from "./detail";
import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileDetail, setIsMobileDetail] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useRecoilState(authState);

  onAuthStateChanged(auth, (newUser) => {
    if (newUser && !user) {
    } else {
    }
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser && (!user || user.uid !== newUser.uid)) {
        setIsLogin(true);
        setUser({
          uid: newUser.uid,
          displayName: newUser.displayName,
          email: newUser.email,
        });
        console.log("user logindddddddd");
      } else {
        setUser(null);
        setIsLogin(false);
        console.log("user logouttttttt  ");
      }
    });

    // 컴포넌트 언마운트 시 감시자 해제
    return () => unsubscribe();
  }, []);

  // 화면 크기에 따라 모바일 여부를 결정
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트에 따라 설정
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="flex justify-center bg-blue-500 text-white">
        <div className="w-full max-w-[1100px]  sm:px-14  text-sm cursor-grab">
          {isLogin ? (
            <div className="flex w-full items-center h-8 justify-end">
              <div className="flex gap-3">
                <div>{}</div>
                <LogoutBtn />
                <Link className="hover:text-orange-500" href="/mypage">
                  마이페이지
                </Link>
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

      <div className="flex justify-center w-[calc(100vw-17px)] bg-white border border-b-gray-200">
        <nav className="cursor-grab w-full max-w-[1100px] h-24 flex items-center justify-between box-border">
          <div className="flex items-center w-full sm:w-1/4">
            <Link href="/" className="w-[300px] m-2">
              <Image
                src={"/assets/logo_horizontal.png"}
                alt="로고"
                width={300}
                height={50}
              />
            </Link>
          </div>

          <div
            className="hidden sm:flex items-center px-10 justify-between w-3/4 h-full"
            onClick={() => setIsDetail((prev) => !prev)}
          >
            <div className="text-black w-1/6 justify-center flex ">
              협회소개
            </div>
            <div className="text-black w-1/6 justify-center flex ">
              공지사항
            </div>
            <div className="text-black w-1/6 justify-center flex ">
              고객문의
            </div>
            <div className="text-black w-1/6 justify-center flex ">
              후원하기
            </div>
            <div className="text-black w-1/6 justify-center flex ">
              쇼핑하기
            </div>
            <div className="text-black w-1/6 justify-center flex ">
              자료마당
            </div>
          </div>

          <div className="sm:hidden flex items-center w-1/4 justify-center">
            <button
              onClick={() => setIsMobileDetail((prev) => !prev)}
              className="text-black"
            >
              메뉴
            </button>
          </div>
        </nav>
      </div>
      {isMobileDetail && isMobile && (
        <div
          className="sm:hidden flex flex-col items-center bg-slate-50 border border-t-0 border-gray-200"
          onClick={() => setIsMobileDetail(false)}
        >
          <Link
            href={"/introduce"}
            className="text-black m-4 w-full text-center"
          >
            협회소개
          </Link>
          <Link
            href={"/notice-board"}
            className="text-black m-4 w-full text-center"
          >
            공지사항
          </Link>
          <Link href={"/support"} className="text-black m-4 w-full text-center">
            고객문의
          </Link>
          <Link
            href={"/donation"}
            className="text-black m-4 w-full text-center"
          >
            후원하기
          </Link>
          <Link href={"/shop"} className="text-black m-4 w-full text-center">
            쇼핑하기
          </Link>
          <Link
            href={"/data-container"}
            className="text-black m-4 w-full text-center"
          >
            자료실
          </Link>
        </div>
      )}

      {!isMobile && isDetail && <Detaiednavbar setIsDetail={setIsDetail} />}
    </div>
  );
};

export default Navbar;
