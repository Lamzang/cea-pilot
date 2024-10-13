import Link from "next/link";

export default function Mobile_organization() {
  return (
    <div className="  mb-20">
      <div className="flex flex-col  ">
        <div className="mt-20 flex justify-center h-12 ">
          <Link
            href={"/organizational/president"}
            className="h-12 border w-48 bg-blue-800 rounded-full flex justify-center items-center"
          >
            <span className="font-bold text-xl text-white">회장</span>
          </Link>
        </div>
        <div className="flex h-10">
          <div className="border-r-2 border-black w-1/2"></div>
        </div>
        <div className="flex justify-center h-12">
          <Link
            href={"/organizational/vice-president"}
            className="h-12 border w-48 bg-blue-500 rounded-full flex justify-center items-center"
          >
            <span className="font-bold text-xl text-white">부회장</span>
          </Link>
        </div>
        <div className="flex h-10">
          <div className="border-r-2 border-black w-1/2"></div>
        </div>
        <div className="flex justify-center h-48">
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
        </div>
        <div className="mt-10 border text-lg flex justify-center items-center py-2 bg-slate-100">
          연수팀
        </div>
        <div className="border flex flex-col gap-3 py-5 items-center">
          <div>CBCI트레이너그룹</div>
          <div>UbD연구자</div>
          <div>학습과학</div>
          <div>평가</div>
        </div>
        <div className="mt-10 border text-lg flex justify-center items-center py-2 bg-slate-100">
          연구개발팀
        </div>
        <div className="border flex flex-col gap-3 py-5 items-center">
          <div>자격증프로그램 개발&운영</div>
          <div>워크북 개발</div>
          <div>영상물 개발</div>
        </div>
        <div className="mt-10 border text-lg flex justify-center items-center py-2 bg-slate-100">
          교육과정(개발)팀
        </div>
        <div className="border flex flex-col gap-3 py-5 items-center">
          <div>초등</div>
          <div>중등</div>
          <div>공학도구연구</div>
        </div>
        <div className="mt-10 border text-lg flex justify-center items-center py-2 bg-slate-100">
          협력지원팀
        </div>
        <div className="border flex flex-col gap-3 py-5 items-center">
          <div>컨퍼런스</div>
          <div>학습지/자료집/홍보물</div>
          <div>국제교육</div>
        </div>
        <div className="mt-10 border text-lg flex justify-center items-center py-2 bg-slate-100">
          운영팀
        </div>
        <div className="border flex flex-col gap-3 py-5 items-center">
          <div>회원제 운영</div>
          <div>지역연구회관리</div>
          <div>총회운영</div>
          <div>자금운영감사</div>
        </div>
      </div>
    </div>
  );
}
