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
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/4 border">
        <div
          className="border"
          onClick={() => setViewUserDetail((prev) => !prev)}
        >
          manage user
        </div>
        {viewUserDetail ? (
          <div className="border ml-6 flex flex-col">
            <Link href="/admin/users" className="border">
              view users
            </Link>
            <Link href="/admin/users/credentials" className="border">
              view credentials for users
            </Link>
          </div>
        ) : null}
        <div
          className="border"
          onClick={() => setViewProductDetail((prev) => !prev)}
        >
          manage Product
        </div>
        {viewProductDetail ? (
          <div className="border ml-6">
            <div className="border">view products</div>
            <div className="border">view product data</div>
            <div className="border">view ordered product</div>
          </div>
        ) : null}
      </div>

      <div className="w-3/4 border pl-5">{children}</div>
    </div>
  );
}
