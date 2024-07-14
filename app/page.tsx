"use client";

import AuthBtn from "@/components/btn/authBtn";
import { Element } from "react-scroll";

export default function Home() {
  return (
    <main className="flex flex-col box-border m-0 p-0 overflow-x-hidden snap-proximity snap-y h-screen">
      <Element name="홈" className="snap-start">
        <div className=" h-screen w-screen border flex justify-center items-center flex-col">
          <div className="text-4xl font-bold">한국개념기반교육협회</div>
          <div>Korea concepted-based education association</div>
          <div className="flex gap-10 text-lg mt-5">
            <AuthBtn addCSS="px-4" type="login" />
            <AuthBtn addCSS="px-4" type="create-account" />
          </div>
        </div>
      </Element>
      <Element name="소개" className="snap-start">
        <div className=" h-screen w-screen border">소개</div>
      </Element>
      <Element name="조직도" className="snap-start">
        <div className="h-screen w-screen border ">조직도</div>
      </Element>
      <Element name="오시는길" className="snap-start">
        <div className="h-screen w-screen border ">오시는길</div>
      </Element>
    </main>
  );
}
