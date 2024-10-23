"use client";

import { projects_array } from "@/constant/organization";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  return (
    <div className="px-10 py-4 flex justify-between border-b-2 items-center">
      <div>갤러리 관리</div>
      <Link
        href={`/admin/gallery/editor`}
        className="p-2 my-2 border px-4 w-fit rounded-3xl bg-blue-500 text-white"
      >
        갤러리 자료 추가하기
      </Link>
    </div>
  );
}
