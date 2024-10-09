import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilWrapper from "@/components/recoil-wrapper";
import SEO from "@/components/SEO/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "한국개념기반교육협회",
  description: "한국개념기반교육협회 홈페이지입니다.",
  keywords:
    "한국개념기반교육협회, 개념기반교육, 개념교육, 개념기반, 교육, 협회, 교육협회, 신교육과정",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <RecoilWrapper>
          <div>{children}</div>
        </RecoilWrapper>
      </body>
    </html>
  );
}
