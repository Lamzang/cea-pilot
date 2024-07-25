"use client";

import AuthBtn from "@/components/btn/authBtn";

export default function Home() {
  return (
    <main className="flex flex-col box-border m-0 p-0 overflow-x-hidden">
      <div className="snap-start">
        <div className=" h-screen w-screen border flex justify-center items-center flex-col">
          <div className="text-4xl font-bold">한국개념기반교육협회</div>
          <div>Korea concepted-based education association</div>
          <div className="flex gap-10 text-lg mt-5">
            <AuthBtn addCSS="px-4" type="login" />
            <AuthBtn addCSS="px-4" type="create-account" />
          </div>
        </div>
      </div>
      <div className="snap-start">
        <div className=" h-screen w-screen border">소개</div>
      </div>
      <div className="snap-start">
        <div className="h-screen w-screen border ">조직도</div>
      </div>
      <div className="snap-start">
        <div className="h-screen w-screen border ">오시는길</div>
      </div>
    </main>
  );
}
