export default function Page() {
  return (
    <div className="min-h-screen ">
      <h1 className="text-3xl font-bold  ml-8 border-b-2 pb-6 mt-6 mb-10">
        임원진
      </h1>
      <div className="w-full h-full grid grid-cols-2 gap-16 p-16">
        <div className="w-full h-auto flex flex-wrap border">
          <img
            className="w-1/2 h-fit"
            src="/assets/excutive/sinenjung.jpg"
            alt="대표이사(회장) 신은정"
          />
          <div className="p-6 w-1/2">
            <div className=" text-lg font-bold pb-2 px-1 text-blue-500">
              대표이사(회장)
            </div>
            <div className="text-3xl font-bold w-full pb-6 border-b border-black">
              신은정
            </div>
            <div className="p-4">
              <div>email@email.com</div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-wrap border">
          <img
            className="w-1/2 h-fit"
            src="/assets/excutive/kimbyeongil.jpg"
            alt="상임이사(부회장) 김병일"
          />
          <div className="p-6 w-1/2">
            <div className=" text-lg font-bold pb-2 px-1 text-blue-500">
              상임이사(부회장)
            </div>
            <div className="text-3xl font-bold w-full pb-6 border-b border-black">
              김병일
            </div>
            <div className="p-4">
              <div>email@email.com</div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-wrap border">
          <img
            className="w-1/2 h-fit"
            src="/assets/excutive/koenji.jpg"
            alt="학술연구이사 고은지"
          />
          <div className="p-6 w-1/2">
            <div className=" text-lg font-bold pb-2 px-1 text-blue-500">
              학술연구이사
            </div>
            <div className="text-3xl font-bold w-full pb-6 border-b border-black">
              고은지
            </div>
            <div className="p-4">
              <div>email@email.com</div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-wrap border">
          <img
            className="w-1/2 h-fit"
            src="/assets/excutive/yunheyyoung.jpg"
            alt="고문이사 윤희영"
          />
          <div className="p-6 w-1/2">
            <div className=" text-lg font-bold pb-2 px-1 text-blue-500">
              고문이사
            </div>
            <div className="text-3xl font-bold w-full pb-6 border-b border-black">
              윤희영
            </div>
            <div className="p-4">
              <div>email@email.com</div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-wrap border">
          <img
            className="w-1/2 h-fit"
            src="/assets/excutive/yunseongjung.jpg"
            alt="운영이사 윤선정"
          />
          <div className="p-6 w-1/2">
            <div className=" text-lg font-bold pb-2 px-1 text-blue-500">
              운영이사
            </div>
            <div className="text-3xl font-bold w-full pb-6 border-b border-black">
              윤선정
            </div>
            <div className="p-4">
              <div>email@email.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
