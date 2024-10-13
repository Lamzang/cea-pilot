"use client";

import { Mobile_Layout } from "@/components/layouts/mobile_layout";
import { PC_Layout } from "@/components/layouts/pc_layout";

import { useEffect, useState } from "react";

const introduce_Layout = [
  {
    name: "",
    link: "/donation",
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
    if (window.innerWidth < 640) {
      setIsMobile(true);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);
  return (
    <>
      <div className="flex flex-col sm:flex-row min-h-screen">
        {isMobile ? (
          <Mobile_Layout
            IMC_LayoutProps={introduce_Layout}
            IMC_MainTitleProps={introduce_MainTitle}
            currentMenu={introduce_MainTitle[3].name}
          />
        ) : (
          <PC_Layout
            IPC_LayoutProps={introduce_Layout}
            IPC_MainTitleProps={introduce_MainTitle[3]}
          />
        )}

        <div className="w-full sm:w-4/5 p-4">{children}</div>
      </div>
    </>
  );
}
