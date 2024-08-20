import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="w-full sm:w-1/5 flex items-start border-b-2 sm:border-b-0 sm:border-r-2 border-gray-300 p-4 bg-gray-100 gap-2 font-bold">
        <Link
          href={"/notice-board"}
          className="sm:mt-5 w-full flex justify-center "
        >
          공지사항
        </Link>
      </div>
      <div className="w-full sm:w-4/5">
        <h1 className="w-full h-24 font-bold flex mt-3 text-3xl p-6 items-center max-w-3xl mx-auto ">
          공지사항
        </h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
