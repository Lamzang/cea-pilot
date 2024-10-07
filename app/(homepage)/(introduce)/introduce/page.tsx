export default function Page() {
  return (
    <div className="min-h-screen ">
      <h1 className="text-3xl font-bold  ml-8 border-b-2 pb-6 mt-6 mb-10">
        인사말
      </h1>
      <div className="bg-white  rounded-lg p-10 m-4  ">
        <h1 className="text-3xl font-bold   mb-6">
          한국개념기반교육협회 홈페이지 방문을 진심으로 환영합니다.
        </h1>
        <h2 className="text-xl  text-gray-800 mb-9  pb-4 border-b-2 ">
          한국개념기반교육협회는 한국교육의 발전과 개념기반교육을 선도하기 위해
          설립된 단체입니다.
        </h2>
        <p className="text-lg  text-gray-600 mb-2 p-1">
          급변하는 세계 정서와 정보속에서 사는 우리 아이들. 지식과 기술만을
          가르치는 교육 속에서 우리 교사들은 많은 회의들을 느끼게 됩니다.
          <br />
          <br />
          21세기가 되고, 가장 트렌디한 기술이라고 할 수 있는 사고력과 창의력에
          대한 요구는 테크놀로지 산업의 부상과 더불어 우리 교육계에도 큰 변화를
          요구하고 있습니다. 하지만 당장에 교육개정안과 학교현장을 비교해보면,
          개념 기반 교습법에 대한 방법론과 모델링할 사례가 부족한 것 또한
          현실입니다.
          <br />
          <br /> 이에 우리 협회는 개념기반교육의 선도적인 역할을 하기 위해
          사례연구, 교사연수 프로그램, 교육자료 개발, 교육과정 개발, 국내외
          교육자들과 교류하며 혁신적인 교육을 선도하고자 합니다.
          <br />
          <br /> 아울러 우리 협회는 앞으로도 국내 교육자들의 목소리에 귀를
          기울이는, 소통의 장으로서 국내 최고의 교육단체로 성장하겠습니다.
          <br />
          <br />
          협회 홈페이지가 회원간의 가교역할과 우리나라의 교육의 발판이 될 수
          있도록 앞으로도 협회에 지속적인 관심과 성원을 보내주실 것을
          부탁드립니다. 감사합니다.
        </p>
        <div className="flex w-full mt-10 h-40 justify-end gap-10 items-center">
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
  );
}
