// pages/index.js
export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold  ml-8 border-b-2 pb-6 mt-6">조직도</h1>
      <div className=" px-16">
        <div className="flex flex-col  ">
          <div className="mt-20 flex justify-center h-12 ">
            <div className="h-12 border w-48 bg-blue-800 rounded-full flex justify-center items-center">
              <span className="font-bold text-xl text-white">회장</span>
            </div>
          </div>
          <div className="flex h-20">
            <div className="border-r-2 border-black w-1/2"></div>
          </div>
          <div className="flex h-20">
            <div className="border-r-2 border-black w-1/2"></div>
            <div className="w-1/2 flex">
              <div className="w-20 flex flex-col">
                <div className="h-7 border-b border-black"></div>
              </div>
              <div className="h-12 border w-48 bg-blue-500 rounded-full flex justify-center items-center">
                <span className="font-bold text-xl text-white">부회장</span>
              </div>
            </div>
          </div>
          <div className="flex h-48">
            <div className="w-1/2 flex border-r-2 border-black">
              <div className="w-[calc(100%-76px)]"></div>
              <div className="border rounded-t-3xl h-fit">
                <div className="h-12 border w-48 bg-blue-500 rounded-full flex justify-center items-center">
                  <div className=" font-bold text-xl text-white">이사</div>
                </div>
                <div className="flex flex-col p-4">
                  <span>- 상임이사</span>
                  <span>- 학술연구이사</span>
                  <span>- 고문이사</span>
                  <span>- 감사위원</span>
                </div>
              </div>

              <div className="w-20 flex flex-col">
                <div className="h-7 border-b border-black "></div>
              </div>
            </div>
            <div className="  w-1/2"></div>
          </div>
          <div className="flex h-10">
            <div className="border-r-2 border-black w-1/2"></div>
          </div>
          <div className="w-full flex">
            <div className=" w-1/12"></div>
            <div className="w-1/6 ">
              <div className="flex h-20">
                <div className="w-1/2"></div>
                <div className="w-1/2 h-20 border-l-2 border-t-2 border-black"></div>
              </div>
              <div className="w-full flex justify-center">
                <div>연수팀</div>
              </div>
            </div>
            <div className="w-1/6 ">
              <div className="flex h-20  ">
                <div className="w-1/2 border-t-2  border-black"></div>
                <div className="w-1/2 h-20 border-l-2 border-t-2  border-black"></div>
              </div>
              <div className="w-full flex justify-center">
                <div>연구개발팀</div>
              </div>
            </div>
            <div className="w-1/6 ">
              <div className="flex h-20  ">
                <div className="w-1/2 border-t-2 border-r-2  border-black"></div>
                <div className="w-1/2 h-20  border-t-2  border-black"></div>
              </div>
              <div className="w-full flex justify-center">
                <div>교육과정(개발)팀</div>
              </div>
            </div>
            <div className="w-1/6 ">
              <div className="flex h-20  ">
                <div className="w-1/2 border-t-2  border-black"></div>
                <div className="w-1/2 h-20 border-l-2 border-t-2  border-black"></div>
              </div>
              <div className="w-full flex justify-center">
                <div>협력지원팀</div>
              </div>
            </div>
            <div className="w-1/6 ">
              <div className="flex h-20  ">
                <div className="w-1/2 h-20 border-r-2 border-t-2  border-black"></div>
              </div>
              <div className="w-full flex justify-center">
                <div>운영팀</div>
              </div>
            </div>
            <div className=" w-1/12"></div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
