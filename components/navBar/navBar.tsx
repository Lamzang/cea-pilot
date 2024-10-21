"use client";

import Image from "next/image";
import Link from "next/link";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authState, userDocState } from "@/lib/recoil/auth";
import LogoutBtn from "../btn/logoutBtn";

import { useState, useEffect } from "react";
import Detaiednavbar from "./detail";
import { app, auth, db } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { IUserDoc } from "@/constant/interface";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

const Navbar = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileDetail, setIsMobileDetail] = useState(false);
  const [userDoc, setUserDoc] = useRecoilState(userDocState);
  const [user, setUser] = useRecoilState(authState);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setUser({
          uid: newUser.uid,
          displayName: newUser.displayName,
          email: newUser.email,
        });
      } else {
        setUser(null);
        setUserDoc(null);
      }
    });
  }, [setUser, setUserDoc]);

  useEffect(() => {
    if (user) {
      getDoc(doc(db, "users", user.uid)).then((doc) => {
        if (doc.exists()) {
          setUserDoc(doc.data() as IUserDoc);
        }
      });
    }
  }, [user, setUserDoc]);

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
    <div className="">
      <div className="flex justify-center bg-blue-500  text-white p-1 ">
        <div className="w-full sm:mx-20 sm:px-14  text-sm cursor-grab">
          {user ? (
            <div className="flex w-full items-center h-8 justify-end">
              <div className="flex gap-3 text-sm items-center">
                {isMobile ? null : (
                  <div>
                    {["관리자"].includes(userDoc?.membershipType ?? "") ? (
                      <Link
                        className="p-1 text-xs px-4 border rounded-2xl hover:bg-gray-200"
                        href={"/admin"}
                      >
                        관리자 방으로 가기
                      </Link>
                    ) : null}
                    {["관리자", "멤버", "정회원"].includes(
                      userDoc?.membershipType ?? ""
                    ) ? (
                      <Link
                        className="p-1 text-xs px-4 border rounded-2xl hover:bg-gray-200"
                        href={"/chat"}
                      >
                        채팅앱으로 가기
                      </Link>
                    ) : null}
                  </div>
                )}
                <div>
                  {userDoc?.username} | {userDoc?.membershipType}
                </div>
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

      <div className="flex justify-center w-full bg-white border border-b-gray-200">
        <nav className="cursor-grab w-full sm:mx-20 px-5 py-10 h-24 flex items-center justify-between  ">
          <div className="flex items-center w-2/3 sm:w-1/4">
            <Link href="/" className="sm:w-[300px] m-2">
              <Image
                src={"/assets/logo_withtext.png"}
                alt="로고"
                width={400}
                height={70}
              />
            </Link>
          </div>

          <div
            className="hidden sm:flex items-center px-10 justify-between w-3/4 h-24"
            onClick={() => setIsDetail((prev) => !prev)}
          >
            <div className="text-black w-1/6 justify-center text-xl font-semibold  flex hover:bg-blue-100 h-full items-center">
              협회소개
            </div>
            <div className="text-black w-1/6 justify-center text-xl font-semibold  flex hover:bg-blue-100 h-full items-center">
              공지사항
            </div>
            <div className="text-black w-1/6 justify-center text-xl font-semibold  flex hover:bg-blue-100 h-full items-center">
              문의사항
            </div>
            <div className="text-black w-1/6 justify-center text-xl font-semibold  flex hover:bg-blue-100 h-full items-center">
              후원하기
            </div>
            <div className="text-black w-1/6 justify-center text-xl font-semibold  flex hover:bg-blue-100 h-full items-center">
              연수 및 도서구매
            </div>
            <div className="text-black w-1/6 justify-center text-xl font-semibold  flex hover:bg-blue-100 h-full items-center">
              자료마당
            </div>
          </div>

          <div className="sm:hidden flex items-center w-1/3 justify-end">
            <div
              className="w-full flex justify-end"
              onClick={() => setIsMobileDetail((prev) => !prev)}
            >
              <img
                src="/assets/svg/menu.svg"
                className="w-1/2"
                alt="menu button"
              />
            </div>
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
            문의사항
          </Link>
          <Link
            href={"/donation"}
            className="text-black m-4 w-full text-center"
          >
            후원하기
          </Link>
          <Link href={"/shop"} className="text-black m-4 w-full text-center">
            연수 및 도서구매
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
