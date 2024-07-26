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
    <div className="w-full ">
      <Link href={"/admin"}>Admin Home</Link>
      <div className="flex h-screen">
        <div className="w-1/4 border">
          <div
            className="border cursor-pointer"
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
            className="border cursor-pointer"
            onClick={() => setViewProductDetail((prev) => !prev)}
          >
            manage Product
          </div>
          {viewProductDetail ? (
            <div className="border ml-6 flex flex-col">
              <Link href={"/admin/products"} className="border">
                view products
              </Link>
              <Link href={"/admin/product-map"} className="border">
                view product data
              </Link>
              <Link href={"/admin/new-product"} className="border">
                make new product
              </Link>
            </div>
          ) : null}
          <Link href={"/admin/message"}>send message for users</Link>
        </div>

        <div className="w-3/4 border pl-5">{children}</div>
      </div>
    </div>
  );
}
