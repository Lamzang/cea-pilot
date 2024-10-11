import SEO from "@/components/SEO/seo";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row min-h-screen">
        <div className="w-full sm:w-1/5 flex sm:flex-col justify-start border-b-2 sm:border-b-0 sm:border-r-2 border-gray-300  ">
          <Link
            href={"/introduce"}
            className="w-full flex justify-center font-bold text-2xl text-white bg-blue-800 hover:bg-blue-400 items-center h-28"
          >
            <div>협회소개</div>
          </Link>
          <Link
            href={"/introduce"}
            className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
          >
            인사말
          </Link>
          <Link
            href={"/history"}
            className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
          >
            연혁
          </Link>
          <Link
            href={"/vision"}
            className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
          >
            비전/미션
          </Link>
          <Link
            href={"/executive"}
            className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
          >
            임원진
          </Link>
          <Link
            href={"/organizational"}
            className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
          >
            조직도
          </Link>
          <Link
            href={"/article"}
            className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
          >
            협회정관
          </Link>
          <Link
            href={"/individual-agreement"}
            className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
          >
            개인정보동의서
          </Link>
          <Link
            href={"/policy"}
            className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
          >
            학문적 윤리 정책
          </Link>
        </div>

        <div className="w-full sm:w-4/5 p-4">{children}</div>
      </div>
    </>
  );
}
