"use client";

import { RecoilRoot } from "recoil";

interface RecoilRootWrapperProps {
  children: React.ReactNode;
}

export default function RecoilWrapper({ children }: RecoilRootWrapperProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
