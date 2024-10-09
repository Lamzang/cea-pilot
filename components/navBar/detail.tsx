"use client";

import Link from "next/link";
import React from "react";

const Detaiednavbar = ({ setIsDetail }: any) => {
  return (
    <div
      className="w-full h-56 bg-blue-50 pt-4 shadow-md flex justify-center text-xs absolute top-32 z-20 "
      onClick={() => setIsDetail(false)}
    >
      <div className="w-full mx-20 flex justify-center items-center ">
        <div className="w-1/4"></div>
        <div className="h-full w-3/4 flex justify-between items-center px-10">
          <div className="flex mx-4 flex-col h-full w-1/6 justify-start items-center">
            <Link
              href={"/introduce"}
              className="py-1 text-base px-4 cursor-pointer hover:bg-gray-200 rounded  w-full  flex justify-center "
            >
              인사말
            </Link>
            <Link
              href={"/history"}
              className="py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded w-full  flex justify-center "
            >
              연혁
            </Link>
            <Link
              href={"/vision"}
              className="py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded w-full  flex justify-center "
            >
              비전/미션
            </Link>

            <Link
              href={"/ececutive"}
              className="py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded w-full  flex justify-center "
            >
              임원진
            </Link>
            <Link
              href={"/organizational"}
              className="py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded w-full  flex justify-center "
            >
              조직도
            </Link>
          </div>
          <div className="flex mx-4 flex-col h-full w-1/6 justify-start items-center">
            <Link
              href="/notice-board"
              className=" py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              공지사항
            </Link>
          </div>

          <div className="flex mx-4 flex-col  h-full w-1/6 justify-start items-center">
            <Link
              href={"/support"}
              className=" py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              문의사항
            </Link>
          </div>
          <div className="flex mx-4 flex-col  h-full w-1/6 justify-start items-center">
            <Link
              href={"/donation"}
              className=" py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              후원하기
            </Link>
          </div>
          <div className="flex mx-4 flex-col  h-full w-1/6 items-center justify-start">
            <Link
              href={"/shop"}
              className="py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              협회장터
            </Link>
          </div>
          <div className="flex mx-4 flex-col  h-full w-1/6 items-center justify-start ">
            <Link
              href={"/data-container"}
              className=" py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              자료마당
            </Link>

            <Link
              href={"/projects"}
              className="py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              프로젝트
            </Link>
            <Link
              href={"/data-container/article"}
              className=" py-2 text-base px-4 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              협회정관
            </Link>
            <Link
              href={"/data-container/individual-agreement"}
              className=" py-2 text-base px-2 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              개인정보동의서
            </Link>
            <Link
              href={"/data-container/policy"}
              className=" py-2 text-base px-2 cursor-pointer hover:bg-gray-200 rounded flex justify-center"
            >
              학문적윤리정책
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detaiednavbar;
