export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">멤버십</h1>

      <div className="space-y-6">
        <div className="border border-gray-300 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">일반회원</h2>
          <p className="text-gray-700">가입비 없음, 일반 소식 접근 가능</p>
        </div>

        <div className="border border-gray-300 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">준회원</h2>
          <p className="text-gray-700">
            가입비 2만원, 연회비 5만원, 기본 자료 접근 가능
          </p>
        </div>

        <div className="border border-gray-300 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">정회원</h2>
          <p className="text-gray-700">
            가입비 2만원, 연회비 10만원, 12시간 이상 연수/동일 자격, 각종
            온오프라인 협회 행사 초대 및 연수 할인 혜택, 운영진으로서 역할 수행
            가능
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">회원 가입 절차</h3>
        <ul className="space-y-3">
          <li className="bg-gray-100 p-4 border-l-4 border-blue-600">
            기본 정보 입력 (이름, 전화번호, 소속 등)
          </li>
          <li className="bg-gray-100 p-4 border-l-4 border-blue-600">
            동의안 서명 (학문정직성, 정관)
          </li>
          <li className="bg-gray-100 p-4 border-l-4 border-blue-600">
            일반회원: 동의안 서명 후 회원 가입 완료
          </li>
          <li className="bg-gray-100 p-4 border-l-4 border-blue-600">
            준회원: 동의안 서명, 입금, 교원 인증 후 이사회 승인 대기
          </li>
          <li className="bg-gray-100 p-4 border-l-4 border-blue-600">
            정회원: 동의안 서명, 입금, 자격 관련 서류 업로드 후 이사회 승인 대기
          </li>
        </ul>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500">
        입금 계좌: 하나은행 306-910020-43305 (한국개념기반교육협회)
      </footer>
    </div>
  );
}
