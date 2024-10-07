import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="w-full sm:w-1/5 flex sm:flex-col justify-start border-b-2 sm:border-b-0 sm:border-r-2 border-gray-300">
        <Link
          href={"/notice-board"}
          className="w-full flex justify-center font-bold text-2xl text-white bg-blue-800 hover:bg-blue-400 items-center h-28"
        >
          공지사항
        </Link>
        <Link
          href={"/notice-board"}
          className="w-full flex hover:bg-gray-200 items-center  h-16 border-b px-4"
        >
          공지사항
        </Link>
      </div>
      <div className="w-full sm:w-4/5 p-4">
        <div>{children}</div>
      </div>
    </div>
  );
}
