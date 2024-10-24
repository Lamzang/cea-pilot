"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

interface IMobile_LayoutProps {
  name: string;
  link: string;
}

interface IMobile_MainTitleProps {
  name: string;
  link: string;
}

export function Mobile_Projects_Layout({
  IMC_LayoutProps,
  IMC_MainTitleProps,
  currentMenu,
  currentAddrees,
}: {
  IMC_LayoutProps: IMobile_LayoutProps[];
  IMC_MainTitleProps: IMobile_MainTitleProps[];
  currentMenu: string;
  currentAddrees: string;
}) {
  const [detailMenu, setDetailMenu] = useState("");
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    if (IMC_LayoutProps.length === 0) return;
    setDetailMenu(IMC_LayoutProps[0].name ?? "");
  }, [IMC_LayoutProps]);

  return (
    <div className="w-full flex">
      <div
        onClick={() => setShowDetail((prev) => !prev)}
        className="relative h-12 w-full border flex justify-center items-center text-lg"
      >
        {detailMenu}
        {showDetail && (
          <div className="absolute top-12 w-full left-0 bg-gray-200 z-40 h-[30vh] overflow-y-scroll">
            {IMC_LayoutProps.map((data: IMobile_LayoutProps, index: number) => (
              <Link key={index} href={`/${currentAddrees}/${data.link}`}>
                <div
                  onClick={() => setDetailMenu(data.name)}
                  className="w-full h-12 flex items-center px-4 hover:bg-gray-400"
                >
                  {data.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
