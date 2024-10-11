export default function Page() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold  ml-8 border-b-2 pb-6 mt-6 mb-10">
        연혁
      </h1>
      <div className="ml-10 pl-10 text-3xl font-bold w-full border-b-2 pb-5">
        2024년
      </div>
      <div className="w-full flex">
        <div className="border-r-4 flex flex-col items-end w-64 h-full min-h-52">
          <div className=" p-4 text-blue-500 h-20 w-fit mt-10 text-3xl font-bold rounded-3xl">
            6월
          </div>
          <div className=" p-4 text-blue-500 h-20 w-fit mt-10 text-3xl font-bold rounded-3xl">
            8월
          </div>
          <div className=" p-4 text-blue-500 h-20 w-fit mt-10 text-3xl font-bold rounded-3xl">
            10월
          </div>
        </div>
        <div className="flex flex-col">
          <div className="px-10 p-4  h-20 mt-10 text-lg font-semibold rounded-3xl">
            6월 8일 - 교사 아이디어 공유 & 확인
          </div>
          <div className="px-10 p-4  h-20 mt-10 text-lg font-semibold rounded-3xl">
            8월 3일 - 비전과 사명 확립
          </div>
          <div className="px-10 p-4  h-20 mt-10 text-lg font-semibold rounded-3xl">
            10월 26일 - 협회 발족
          </div>
        </div>
      </div>
    </div>
  );
}
