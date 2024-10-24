"use client";

import { Mobile_Layout } from "@/components/layouts/mobile_layout";
import { PC_Layout } from "@/components/layouts/pc_layout";

import { useEffect, useState } from "react";

const introduce_Layout = [
  {
    name: "자료실",
    link: "/data-container",
  },
  {
    name: "프로젝트",
    link: "/projects",
  },
  {
    name: "갤러리",
    link: "/gallery",
  },
];

const introduce_MainTitle = [
  { name: "협회소개", link: "/introduce" },
  { name: "공지사항", link: "/notice-board" },
  { name: "문의사항", link: "/support" },
  { name: "후원하기", link: "/donation" },
  { name: "연수 및 도서구매", link: "/shop" },
  { name: "자료마당", link: "/data-container" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {isMobile ? (
          <Mobile_Layout
            IMC_LayoutProps={introduce_Layout}
            IMC_MainTitleProps={introduce_MainTitle}
            currentMenu={introduce_MainTitle[5].name}
          />
        ) : (
          <PC_Layout
            IPC_LayoutProps={introduce_Layout}
            IPC_MainTitleProps={introduce_MainTitle[5]}
          />
        )}

        <div className="w-full lg:w-4/5 p-4">{children}</div>
      </div>
    </>
  );
}
