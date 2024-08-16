"use client";

import LogoutBtn from "@/components/btn/logoutBtn";
import Footer from "@/components/footer";
import { authState } from "@/lib/recoil/auth";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isLogin = useRecoilValue(authState).isLoggedIn;
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-[1100px] px-4 sm:px-16">
          {isLogin ? (
            <div className="flex w-full justify-end">
              <div className="flex">
                <LogoutBtn />
                <Link href="/mypage" className="ml-4">
                  마이페이지
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-end items-center text-sm h-8">
              <div className="flex mr-2 sm:mr-5 gap-2 sm:gap-3">
                <Link className="hover:text-orange-500" href="/login">
                  로그인
                </Link>
                <Link className="hover:text-orange-500" href="/create-account">
                  회원가입
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full bg-slate-50 border border-b-gray-200 flex justify-center">
        <nav className="w-full max-w-[1100px] h-16 sm:h-24 flex items-center justify-between box-border">
          <div className="flex items-center w-full sm:w-1/4 justify-center sm:justify-start">
            <Link href="/" className="w-[50px] m-2">
              <Image
                src={"/assets/logo.png"}
                alt="로고"
                width={50}
                height={50}
              />
            </Link>

            <Link href="/" className="m-2 text-center sm:text-left">
              <div className="text-black text-base sm:text-xl font-bold w-max">
                한국개념기반교육협회
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-center sm:justify-end w-full sm:w-3/4 h-full px-2 sm:px-10">
            <Link
              href={"/cart"}
              className="text-black m-2 sm:m-4 w-1/2 sm:w-1/6 text-center"
            >
              장바구니
            </Link>
            <Link
              href={"/support"}
              className="text-black m-2 sm:m-4 w-1/2 sm:w-1/6 text-center"
            >
              고객문의
            </Link>
          </div>
        </nav>
      </div>
      <div className="flex justify-center">
        <main className="w-full max-w-[1100px] px-4 sm:px-0">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
