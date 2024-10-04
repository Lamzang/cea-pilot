"use client";

import Link from "next/link";
import React from "react";

const Detaiednavbar = ({ setIsDetail }: any) => {
  return (
    <div
      className="w-full h-48 bg-blue-50 pt-4 shadow-md flex justify-center text-xs absolute top-32"
      onClick={() => setIsDetail(false)}
    >
      <div className="w-full mx-20 flex justify-center items-center ">
        <div className="w-1/4"></div>
        <div className="h-full w-3/4 flex justify-between items-center px-10">
          <div className="flex m-4 flex-col h-full w-1/6 justify-start items-center">
            <Link
              href={"/introduce"}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded font-bold w-full  flex justify-center "
            >
              협회소개
            </Link>
            <Link
              href={"/history"}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded w-full  flex justify-center "
            >
              연혁
            </Link>
            <Link
              href={"/organizational"}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded w-full  flex justify-center "
            >
              조직도
            </Link>
            <Link
              href={"/vision"}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded w-full  flex justify-center "
            >
              비전강령
            </Link>
            <Link
              href={"/location"}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded w-full  flex justify-center "
            >
              오시는길
            </Link>
          </div>
          <div className="flex m-4 flex-col h-full w-1/6 justify-start items-center">
            <Link
              href="/notice-board"
              className="font-bold py-2 px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              공지사항
            </Link>
          </div>

          <div className="flex m-4 flex-col  h-full w-1/6 justify-start items-center">
            <Link
              href={"/support"}
              className="font-bold py-2 px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              고객문의
            </Link>
            <Link
              href={"/FAQ"}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              FAQ
            </Link>
            <Link
              href={"/individual"}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              1:1문의
            </Link>
          </div>
          <div className="flex m-4 flex-col  h-full w-1/6 justify-start items-center">
            <Link
              href={"/donation"}
              className="font-bold py-2 px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              후원하기
            </Link>
          </div>
          <div className="flex m-4 flex-col  h-full w-1/6 items-center justify-start">
            <Link
              href={"/shop"}
              className="font-bold py-2 px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              쇼핑하기
            </Link>
          </div>
          <div className="flex m-4 flex-col  h-full w-1/6 items-center justify-start ">
            <Link
              href={"/data-container"}
              className="font-bold py-2 px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              자료마당
            </Link>
            <Link
              href={"/gallery"}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              갤러리
            </Link>
            <Link
              href={"/projects"}
              className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              프로젝트
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detaiednavbar;
