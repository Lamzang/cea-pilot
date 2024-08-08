import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 flex flex-col justify-start border-r-2 border-gray-300 p-4 bg-gray-100 gap-2">
        <Link
          href={"/data-container"}
          className="w-full flex justify-center font-bold hover:bg-gray-200 items-center rounded-full h-10"
        >
          자료실
        </Link>
        <Link
          href={"/gallery"}
          className="w-full flex justify-center hover:bg-gray-200 items-center rounded-full h-10"
        >
          갤러리
        </Link>
        <Link
          href={"/projects"}
          className="w-full flex justify-center hover:bg-gray-200 items-center rounded-full h-10"
        >
          프로젝트
        </Link>
      </div>
      <div className="w-4/5 p-4">{children}</div>
    </div>
  );
}
