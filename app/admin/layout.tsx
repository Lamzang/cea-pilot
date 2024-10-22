"use client";

import { authState, userDocState } from "@/lib/recoil/auth";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewProductDetail, setViewProductDetail] = useState(false);
  const [user, setUser] = useRecoilState(userDocState);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.membershipType !== "관리자") {
        alert("관리자만 접근 가능합니다.");
        router.push("/");
      }
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="bg-gray-100 p-4 border-b border-gray-300 flex justify-between">
        <Link className="text-blue-500 text-2xl" href={"/admin"}>
          관리자 페이지
        </Link>
        <Link className="bg-black text-white p-1 px-2 rounded" href={"/"}>
          홈페이지로 돌아가기
        </Link>
      </div>
      <div className="flex w-full h-full">
        <div className="w-1/5 h-full border-r border-gray-300 bg-gray-50 p-4">
          <div className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2">
            유저 관리하기
          </div>
          <div className="ml-4 flex flex-col mb-2">
            <Link
              className="py-1 px-2 text-gray-700 hover:bg-slate-200"
              href="/admin/users"
            >
              유저 목록
            </Link>
          </div>

          <div className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2">
            Notice
          </div>
          <div className="ml-4 flex flex-col mb-5">
            <Link
              className="py-1 px-2 text-gray-700 hover:bg-slate-200"
              href={"/admin/notice"}
            >
              공지사항 관리하기
            </Link>
          </div>
          <div className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2">
            자료마당 관리
          </div>
          <div className="ml-4 flex flex-col mb-5">
            <Link
              className="py-1 px-2 text-gray-700 hover:bg-slate-200"
              href={"/admin/data-container"}
            >
              자료실 자료 추가하기
            </Link>
            <Link
              className="py-1 px-2 text-gray-700 hover:bg-slate-200"
              href={"/admin/projects"}
            >
              프로젝트 자료 추가하기
            </Link>
          </div>

          <div className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2">
            사내메신저
          </div>
          <div className="ml-4 flex flex-col mb-5">
            <Link
              className="py-1 px-2 text-gray-700 hover:bg-slate-200"
              href={"/chat/admin"}
            >
              사내메신저 관리하기
            </Link>
          </div>

          <div className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2">
            홈페이지 정보 수정
          </div>
          <div className="ml-4 flex flex-col mb-5">
            {/* <Link
              className="py-1 px-2 text-gray-700 hover:bg-slate-200"
              href={"/admin/introduce"}
            >
              인사말 수정하기
            </Link> */}
          </div>

          <div
            className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-5"
            onClick={() => setViewProductDetail((prev) => !prev)}
          >
            Manage Product
          </div>
          {viewProductDetail && (
            <div className="ml-4 flex flex-col">
              <Link href={"/admin/products"}>View Products</Link>
              <Link
                className="py-1 text-gray-700 hover:underline"
                href={"/admin/product-map"}
              >
                View Product Data
              </Link>
              <Link
                className="py-1 text-gray-700 hover:underline"
                href={"/admin/new-product"}
              >
                Make New Product
              </Link>
              <Link
                className="py-1 text-gray-700 hover:underline"
                href={"/admin/delete-product"}
              >
                Delete Products
              </Link>
            </div>
          )}
        </div>
        <div className="w-4/5 h-full flex-grow border-l border-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
}
