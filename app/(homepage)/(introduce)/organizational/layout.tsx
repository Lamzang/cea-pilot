"use client";

import Mobile_organization from "@/components/organizations/Mobile_organization";
import PC_organization from "@/components/organizations/PC_organization";

import { useEffect, useState } from "react";

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
    <div>
      <h1 className="text-3xl font-bold  sm:ml-8 ml-1 border-b-2 pb-6 mt-6">
        조직도
      </h1>
      {isMobile ? <Mobile_organization /> : <PC_organization />}

      <div>{children}</div>
    </div>
  );
}
