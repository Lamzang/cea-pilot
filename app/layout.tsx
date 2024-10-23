import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilWrapper from "@/components/recoil-wrapper";
import SEO from "@/components/SEO/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "한국개념기반교육협회",
  description:
    "한국개념기반교육협회 홈페이지입니다. 개념기반교육에 대해 협력과 연구를 통해 전문성을 강화하고 개념기반교육에 대한 혁신적 아이디어를 탐색합니다.",
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
      <meta
        name="naver-site-verification"
        content="9fc46ad0a4f0a060cd04c08b9734b44c9dccd805"
      />
      <link rel="canonical" href="https://kcbea.com" />

      <body className={`${inter.className} `}>
        <RecoilWrapper>
          <div>{children}</div>
        </RecoilWrapper>
      </body>
    </html>
  );
}
