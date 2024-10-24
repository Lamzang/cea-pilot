"use client";

import { Mobile_Layout } from "@/components/layouts/mobile_layout";
import { PC_Layout } from "@/components/layouts/pc_layout";
import { is } from "immutable";
import { useEffect, useState } from "react";

const introduce_Layout = [
  {
    name: "일반문의",
    link: "/support",
  },
  {
    name: "자주묻는질문",
    link: "/FAQ",
  },
  {
    name: "설계관련질문",
    link: "/study-architecture",
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
            currentMenu={introduce_MainTitle[2].name}
          />
        ) : (
          <PC_Layout
            IPC_LayoutProps={introduce_Layout}
            IPC_MainTitleProps={introduce_MainTitle[2]}
          />
        )}

        <div className="w-full lg:w-4/5 p-4">{children}</div>
      </div>
    </>
  );
}
