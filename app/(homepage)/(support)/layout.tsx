import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sm:flex-row flex-col flex min-h-screen">
      <div className="sm:w-1/5 w-full flex sm:flex-col justify-start border-b-2 sm:border-b-0 sm:border-r-2 border-gray-300 p-4 bg-gray-100 gap-2">
        <Link
          href={"/support"}
          className="w-full flex justify-center font-bold hover:bg-gray-200 items-center rounded-full h-10"
        >
          고객문의
        </Link>
        <Link
          href={"/FAQ"}
          className="w-full flex justify-center hover:bg-gray-200 items-center rounded-full h-10"
        >
          FAQ
        </Link>
        <Link
          href={"/individual"}
          className="w-full flex justify-center hover:bg-gray-200 items-center rounded-full h-10"
        >
          1대1 문의
        </Link>
      </div>
      <div className="w-4/5 p-4">{children}</div>
    </div>
  );
}
