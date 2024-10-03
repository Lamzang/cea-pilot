import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center flex-col p-10 items-center h-full bg-gray-50">
      <div className="border m-10  bg-white shadow-md rounded-lg w-full max-w-fit p-8 flex flex-col justify-center gap-6">
        <div className="flex justify-center text-3xl font-bold text-gray-800 mb-4">
          회원가입이 완료되었습니다.
        </div>
        <p>로그인 후 이제 더 많은 정보와 서비스를 즐기실 수 있습니다.</p>

        <Link
          className="py-3 px-5 bg-blue-500 text-white font-bold flex justify-center items-center"
          href={"/login"}
        >
          로그인 하러 가기
        </Link>
      </div>
      <div className="space-y-4 border-2 rounded-3xl p-6 bg-white">
        <div className="text-xl font-bold">회원정보</div>

        <div className="text-gray-700">
          <span className="font-semibold">일반회원:</span> 일반소식 접근
        </div>

        <div className="text-gray-700">
          <span className="font-semibold">준회원:</span> 기본 자료 접근
        </div>

        <div className="text-gray-700">
          <span className="font-semibold">정회원:</span> 12시간 이상 연수/동일
          자격, 각종 온오프라인 협회 행사 초대 및 연수 할인 혜택, 운영진으로서
          역할 수행 가능
        </div>

        <div className="text-red-500 text-sm">
          * 준회원과 정회원은 가입 신청 후 승인까지 주말 제외한 1~2일이
          소요됩니다.
        </div>
      </div>
    </div>
  );
}
