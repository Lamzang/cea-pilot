"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewUserDetail, setViewUserDetail] = useState(false);
  const [viewProductDetail, setViewProductDetail] = useState(false);
  const [viewNoticeDetail, setViewNoticeDetail] = useState(false);
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="bg-gray-100 p-4 border-b border-gray-300 flex justify-between">
        <Link className="text-blue-500 text-2xl" href={"/admin"}>
          Admin Home
        </Link>
        <Link className="bg-black text-white p-1 px-2 rounded" href={"/"}>
          Back to Home
        </Link>
      </div>
      <div className="flex w-full h-full">
        <div className="w-1/5 h-full border-r border-gray-300 bg-gray-50 p-4">
          <div
            className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2"
            onClick={() => setViewUserDetail((prev) => !prev)}
          >
            Manage User
          </div>
          {viewUserDetail && (
            <div className="ml-4 flex flex-col">
              <Link
                className="py-1 text-gray-700 hover:underline"
                href="/admin/users"
              >
                View Users
              </Link>
              <Link
                className="py-1 text-gray-700 hover:underline"
                href="/admin/users/credentials"
              >
                View Credentials for Users
              </Link>
            </div>
          )}
          <div
            className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2"
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
          <div
            className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2"
            onClick={() => setViewNoticeDetail((prev) => !prev)}
          >
            Notice
          </div>
          {viewNoticeDetail && (
            <div className="ml-4 flex flex-col">
              <Link href={"/admin/notice"}>View Notices</Link>
            </div>
          )}
          <Link
            className="py-1 text-gray-700 hover:underline"
            href={"/chat/admin"}
          >
            사내메신저 관리하기기
          </Link>
        </div>
        <div className="w-4/5 h-full flex-grow border-l border-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
}
