export default function Page() {
  const teams = [
    {
      name: "연수팀",
      mission: "우리는 협력과 연구를 통해 교육의 질을 높인다.",
      color: "blue",
      icon: "📘",
    },
    {
      name: "협력지원팀",
      mission:
        "우리는 사례 연구와 발표를 통해 전문성을 강화한다. 우리는 국내외 교육자들과 교류하며 혁신적 아이디어와 새로운 현상을 탐색한다.",
      color: "green",
      icon: "🤝",
    },
    {
      name: "연구개발팀",
      mission: "우리는 다양하고 전문적인 교사 연수 프로그램을 개발한다.",
      color: "yellow",
      icon: "🔬",
    },
    {
      name: "교육과정개발팀",
      mission:
        "개념적 이해를 강조하고 고차원적 사고를 개발하는 설계 원칙을 수립하고 교육과정 개발을 위해 협업한다.",
      color: "purple",
      icon: "📚",
    },
    {
      name: "운영팀",
      mission: "협회인들이 만나서 신뢰를 구축하고 연대할 환경을 구축한다.",
      color: "red",
      icon: "🏢",
    },
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold ml-8 border-b-2 pb-6 mt-6 mb-20">
        비전 / 사명
      </h1>
      <div className="m-8 mb-14">
        {/* Vision Section */}
        <section className="mb-8 flex flex-col items-center border border-gray-300 relative p-7 rounded-3xl">
          <h1 className="text-5xl absolute -top-6 bg-white font-bold z-10 px-10 text-blue-600 mb-4">
            VISION
          </h1>
          <p className="text-lg text-gray-700 mt-5">
            우리는 교육적 사명감을 바탕으로 미래 교육을 선도하며, 생각하는
            교실을 통해 개념적 이해를 전이하는 평생 학습자를 양성하고, 협력적
            공동체를 실현한다.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold mb-16   w-full border-b-4 border-gray-500 pb-10">
            사명(미션)
          </h2>
          <div className="flex flex-col gap-10">
            {teams.map((team, index) => (
              <div
                key={index}
                className={` p-6 rounded-lg border border-gray-300 flex flex-col relative`}
              >
                <h3 className="text-xl font-semibold absolute -top-3 bg-white z-10 w-fit px-4">
                  {team.name}
                </h3>
                <p className="text-gray-700 ">{team.mission}</p>
              </div>
            ))}
          </div>
          <div className="w-full border-t-4 border-gray-500 mt-10"></div>
        </section>
      </div>
    </div>
  );
}
