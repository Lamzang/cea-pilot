import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-3xl font-bold  ml-8 border-b-2 pb-6 mt-6">조직도</h1>
      <div className=" px-16 mb-20">
        <div className="flex flex-col  ">
          <div className="mt-20 flex justify-center h-12 ">
            <Link
              href={"/organizational/president"}
              className="h-12 border w-48 bg-blue-800 rounded-full flex justify-center items-center"
            >
              <span className="font-bold text-xl text-white">회장</span>
            </Link>
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
              <Link
                href={"/organizational/vice-president"}
                className="h-12 border w-48 bg-blue-500 rounded-full flex justify-center items-center"
              >
                <span className="font-bold text-xl text-white">부회장</span>
              </Link>
            </div>
          </div>
          <div className="flex h-48">
            <div className="w-1/2 flex border-r-2 border-black">
              <div className="w-[calc(100%-76px)]"></div>
              <div className="border-b border-x border-black rounded-t-3xl h-fit">
                <div className="h-12 border w-48 bg-blue-500 rounded-full flex justify-center items-center">
                  <div className=" font-bold text-xl text-white">이사</div>
                </div>
                <Link
                  href={"/organizational/director"}
                  className="flex flex-col p-4"
                >
                  <span>- 상임이사</span>
                  <span>- 학술연구이사</span>
                  <span>- 고문이사</span>
                  <span>- 감사위원</span>
                </Link>
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
          <div className="w-full flex justify-center">
            <div className="w-1/6 ">
              <div className="flex h-20">
                <div className="w-1/2"></div>
                <div className="w-1/2 h-20 border-l-2 border-t-2 border-black"></div>
              </div>
              <Link
                href={"/organizational/training-team"}
                className="w-full flex flex-col justify-center  gap-1 border-black pl-1"
              >
                <div className="p-1 pl-0 border-b border-gray-200 text-lg font-bold w-full text-center">
                  연수팀
                </div>
                <div>- CBCI트레이너그룹</div>
                <div>- UbD연구자</div>
                <div>- 학습과학</div>
                <div>- 평가</div>
              </Link>
            </div>
            <span className="w-10 border-t-2 border-black"></span>
            <div className="w-1/6 ">
              <div className="flex h-20  ">
                <div className="w-1/2 border-t-2  border-black"></div>
                <div className="w-1/2 h-20 border-l-2 border-t-2  border-black"></div>
              </div>
              <Link
                href={"/organizational/RD-team"}
                className="w-full flex flex-col justify-center  gap-1 border-black pl-1"
              >
                <div className="p-1 pl-0 border-b border-gray-200 text-lg font-bold w-full text-center">
                  연구개발팀
                </div>
                <div>- 자격증프로그램 개발&운영</div>
                <div>- 워크북 개발</div>
                <div>- 영상물 개발</div>
              </Link>
            </div>
            <span className="w-10 border-t-2 border-black"></span>
            <div className="w-1/6 ">
              <div className="flex h-20  ">
                <div className="w-1/2 border-t-2 border-r-2  border-black"></div>
                <div className="w-1/2 h-20  border-t-2  border-black"></div>
              </div>
              <Link
                href={"/organizational/curriculum-team"}
                className="w-full flex flex-col justify-center  gap-1 border-black pl-1"
              >
                <div className="p-1 pl-0 border-b border-gray-200 text-lg font-bold w-full text-center">
                  교육과정(개발)팀
                </div>
                <div>- 초등</div>
                <div>- 중등</div>
                <div>- 공학도구연구</div>
              </Link>
            </div>
            <span className="w-10 border-t-2 border-black"></span>
            <div className="w-1/6 ">
              <div className="flex h-20  ">
                <div className="w-1/2 border-t-2  border-black"></div>
                <div className="w-1/2 h-20 border-l-2 border-t-2  border-black"></div>
              </div>
              <Link
                href={"/organizational/partnership-support-team"}
                className="w-full flex flex-col justify-center  gap-1 border-black pl-1"
              >
                <div className="p-1 pl-0 border-b border-gray-200 text-lg font-bold w-full text-center">
                  협력지원팀
                </div>
                <div>- 컨퍼런스</div>
                <div>- 학습지/자료집/홍보물</div>
                <div>- 국제교육</div>
              </Link>
            </div>
            <span className="w-10 border-t-2 border-black"></span>
            <div className="w-1/6 ">
              <div className="flex h-20  ">
                <div className="w-1/2 h-20 border-r-2 border-t-2  border-black"></div>
              </div>
              <Link
                href={"/organizational/operation-team"}
                className="w-full flex flex-col justify-center  gap-1 border-black pl-1"
              >
                <div className="p-1 pl-0 border-b border-gray-200 text-lg font-bold w-full text-center">
                  운영팀
                </div>
                <div>- 회원제 운영</div>
                <div>- 지역연구회관리</div>
                <div>- 총회운영</div>
                <div>- 자금운영감사</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
