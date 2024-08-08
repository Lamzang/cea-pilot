import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="w-1/5 flex justify-center border-r-2 font-bold">
        <Link
          href={"/notice-board"}
          className="mt-5 w-full flex justify-center "
        >
          공지사항
        </Link>
      </div>
      <div className="w-4/5">
        <h1 className="w-full h-24 font-bold flex mt-3 text-3xl p-6 items-center max-w-3xl mx-auto ">
          공지사항
        </h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
