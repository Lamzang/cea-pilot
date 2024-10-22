import SEO from "@/components/SEO/seo";

export default function Page() {
  return (
    <>
      <SEO title="인사말" />
      <div className="min-h-screen ">
        <h1 className="text-3xl font-bold  sm:ml-8 ml-1 border-b-2 pb-6 mt-6 mb-4">
          인사말
        </h1>
        <div className="bg-white  rounded-lg sm:p-10 m-4  ">
          <h1 className="text-3xl font-bold   mb-10">환영합니다</h1>

          <p className="text-lg  text-gray-600 mb-2 p-1">
            급변하는 세계 정세와 정보의 홍수 속에서 자라나는 우리 아이들.
            21세기에 필수적인 &apos;미래 역량&apos; - 사고력, 자기관리 기능,
            소통 기능, 사회성, 연구 기능 등은 어떻게 개발 가능할까요? 우리
            교사는 어떻게 우리 아이들이 공동체에 기여하는 지성인으로 자라나도록
            도와줄 수 있을까요?
            <br />
            <br />
            개념 기반 탐구를 통한 교육 혁신의 필요성은 널리 인식되고 있지만,
            현장에서 이것을 실천하기란 쉽지 않습니다. 실용적인 방법론과 구체적인
            적용 사례가 부족한 것이 현실입니다.
            <br />
            <br /> 이에 우리 협회는 다각도로 접근하여 이 과제를 해결하고자
            합니다:
            <br />
            <br /> 1. 연수팀은 협력과 연구를 통해 교사 역량과 수업의 품질을
            강화할 것입니다.
            <br /> 2. 협력지원팀은 사례 연구와 발표를 통해 전문성을 강화하고,
            국내외 교육자들과의 교류를 통해 혁신적 아이디어를 탐색할 것입니다.
            <br /> 3. 연구개발팀은 다양하고 전문적인 교사 연수 프로그램을
            개발하여 교사 리더를 양성할 것입니다.
            <br /> 4. 교육과정개발팀은 개념적 이해와 고차원적 사고를 중심으로 한
            교육과정 설계 원칙을 수립하고 콘텐츠를 개발하여 선생님들을 지원할
            것입니다.
            <br /> 5. 운영팀은 협회 구성원들이 신뢰를 구축하고 연대할 수 있는
            환경을 조성합니다.
            <br />
            <br />
            이러한 종합적이고 체계적인 접근을 통해, 협회는 교육 현장에
            실질적이고 지속 가능한 변화를 이끌어내고자 합니다. 리더십과
            교사협업이 어우러진 교사 단체로 학습 공동체의 주도성 회복을 위해
            주력하겠습니다. 감사합니다.
            <br />
          </p>
          <div className="flex w-full mt-14 h-40 justify-end gap-10 items-center">
            <div className="text-lg h-fit text-gray-600 font-semibold">
              한국개념기반교육협회 회장 신은정
            </div>
            <img
              src="/assets/excutive/sinenjung.jpg"
              alt="회장"
              className="w-40 h-40 object-cover rounded-xl border-4 border-gray-300 shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
