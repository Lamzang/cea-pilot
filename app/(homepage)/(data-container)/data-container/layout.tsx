"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Mobile_Projects_Layout } from "@/components/layouts/mobile_project_layout";
import { dataContainer_array } from "@/constant/organization";

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
  const [clickedIndex, setClickedIndex] = useState<number>(0); // Track which index is clicked
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
      <div className="flex flex-col min-h-screen">
        <div className="flex w-full border-b-2 pb-6 mt-6 sm:mb-10 sm:ml-8 ml-1 justify-between">
          <h1 className="text-3xl font-bold  w-1/2 ">프로젝트</h1>
          <div className="w-1/2">
            {isMobile && (
              <Mobile_Projects_Layout
                IMC_LayoutProps={dataContainer_array}
                IMC_MainTitleProps={introduce_MainTitle}
                currentMenu={introduce_MainTitle[5].name}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          {isMobile === false && (
            <div className="flex flex-col w-1/6 border-r-2">
              {dataContainer_array.map(
                (layout: { name: string; link: string }, index: number) => (
                  <Link
                    className={`flex justify-start items-center h-12 border-b-2 px-2 hover:bg-gray-100 ${
                      clickedIndex === index
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                    key={index}
                    href={"/data-container/" + layout.link}
                    onClick={() => setClickedIndex(index)} // Update the clicked index
                  >
                    {layout.name}
                  </Link>
                )
              )}
            </div>
          )}

          <div className="w-full sm:w-5/6 p-4">{children}</div>
        </div>
      </div>
    </>
  );
}