import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 flex flex-col justify-start border-r-2 border-gray-300 p-4 bg-gray-100 gap-2">
        <Link
          href={"/introduce"}
          className="w-full flex justify-center font-bold hover:bg-gray-200 items-center rounded-full h-10"
        >
          협회소개
        </Link>
        <Link
          href={"/history"}
          className="w-full flex justify-center hover:bg-gray-200 items-center rounded-full h-10"
        >
          연혁
        </Link>
        <Link
          href={"/organizational"}
          className="w-full flex justify-center hover:bg-gray-200 items-center rounded-full h-10"
        >
          조직도
        </Link>
        <Link
          href={"/vision"}
          className="w-full flex justify-center hover:bg-gray-200 items-center rounded-full h-10"
        >
          비전강령
        </Link>
        <Link
          href={"/location"}
          className="w-full flex justify-center hover:bg-gray-200 items-center rounded-full h-10"
        >
          오시는길
        </Link>
      </div>
      <div className="w-4/5 p-4">{children}</div>
    </div>
  );
}
