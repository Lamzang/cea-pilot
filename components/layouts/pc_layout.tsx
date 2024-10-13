import Link from "next/link";

interface IPC_LayoutProps {
  name: string;
  link: string;
}

interface IPC_MainTitleProps {
  name: string;
  link: string;
}

export function PC_Layout({
  IPC_LayoutProps,
  IPC_MainTitleProps,
}: {
  IPC_LayoutProps: IPC_LayoutProps[];
  IPC_MainTitleProps: IPC_MainTitleProps;
}) {
  return (
    <div className="w-full sm:w-1/5 flex sm:flex-col justify-start border-b-2 sm:border-b-0 sm:border-r-2 border-gray-300  ">
      <Link
        href={IPC_MainTitleProps.link}
        className="w-full flex justify-center font-bold text-2xl text-white bg-blue-800 hover:bg-blue-400 items-center h-28"
      >
        <div>{IPC_MainTitleProps.name}</div>
      </Link>
      {IPC_LayoutProps.map((data: IPC_LayoutProps, index: number) => (
        <Link
          key={index}
          href={data.link}
          className="w-full flex hover:bg-gray-200 items-center   h-16 border-b px-4"
        >
          {data.name}
        </Link>
      ))}
    </div>
  );
}
