export default function Page() {
  return (
    <div className="min-h-screen ">
      <h1 className="text-3xl font-bold ml-1 sm:ml-8 border-b-2 pb-6 mt-6 mb-10">
        후원하기
      </h1>
      <div className="flex flex-col sm:flex-row w-full sm:mx-10 gap-5 sm:gap-20">
        {/* Left Column */}
        <div className="w-full sm:w-1/3 flex justify-center">
          <div className="w-full sm:p-6 max-w-md ml-8 sm:ml-0">
            <p>
              <span className="text-xl font-bold">입회비와 회비 안내</span>
              <br /> <br />
              <span className="block text-lg mb-2">
                가. 정회원 연회비 : 100,000원
              </span>
              <span className="block text-lg mb-2">
                나. 정회원 가입비 : 20,000원
              </span>
              <span className="block text-lg mb-2">
                다. 준회원 연회비 : 50,000원
              </span>
              <span className="block text-lg mb-2">
                라. 준회원 가입비 : 20,000원
              </span>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white w-full sm:w-2/3 pt-8 sm:p-8 rounded-3xl text-center border-4">
          <div className="text-2xl font-bold mb-6 text-blue-600">입금계좌</div>
          <div className="text-lg mb-2 text-gray-600">하나은행</div>
          <div className="text-3xl font-mono text-gray-800 mb-4">
            306-910020-43305
          </div>
          <div className="text-md text-gray-500 mb-4">한국개념기반교육협회</div>
        </div>
      </div>
      <p className="text-center text-base text-red-500 mt-10 sm:mt-24">
        * 올해 가입하는 회원은 연회비 적용을 2025년 연말까지 적용합니다.
      </p>
    </div>
  );
}
