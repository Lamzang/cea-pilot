// pages/index.js
export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Vision Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">비전</h1>
          <p className="text-lg text-gray-700">
            우리는 교육적 사명감을 바탕으로 미래 교육을 선도하며, 생각하는
            교실을 통해 개념적 이해를 전이하는 평생 학습자를 양성하고, 협력적
            공동체를 실현한다.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">사명(미션)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">[연수팀]</h3>
              <p className="text-gray-700">
                우리는 협력과 연구를 통해 교육의 질을 높인다.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">[협력지원팀]</h3>
              <p className="text-gray-700">
                우리는 사례 연구와 발표를 통해 전문성을 강화한다. 우리는 국내외
                교육자들과 교류하며 혁신적 아이디어와 새로운 현상을 탐색한다.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">[연구개발팀]</h3>
              <p className="text-gray-700">
                우리는 다양하고 전문적인 교사 연수 프로그램을 개발한다.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">[교육과정개발팀]</h3>
              <p className="text-gray-700">
                개념적 이해를 강조하고 고차원적 사고를 개발하는 설계 원칙을
                수립하고 교육과정 개발을 위해 협업한다.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">[운영팀]</h3>
              <p className="text-gray-700">
                협회인들이 만나서 신뢰를 구축하고 연대할 환경을 구축한다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
