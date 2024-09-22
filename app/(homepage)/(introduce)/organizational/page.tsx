// pages/index.js
export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6">조직도</h1>

        {/* Leadership Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Leadership</h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">대표이사(회장):</span> 신은정
            </p>
            <p>
              <span className="font-semibold">상임이사(부회장):</span> 김병일
            </p>
            <p>
              <span className="font-semibold">학술연구이사:</span> 고은지
            </p>
            <p>
              <span className="font-semibold">고문이사:</span> 윤희영
            </p>
            <p>
              <span className="font-semibold">운영이사:</span> 윤선정
            </p>
          </div>
        </section>

        {/* Team Structure Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 연수팀 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">연수팀</h3>
              <p>
                <span className="font-semibold">팀장:</span> 신은정
              </p>
              <p>
                <span className="font-semibold">부팀장:</span> 김희정
              </p>
            </div>

            {/* 연구개발팀 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">연구개발팀</h3>
              <p>
                <span className="font-semibold">팀장:</span> 김병일
              </p>
              <p>
                <span className="font-semibold">부팀장:</span> 신은정
              </p>
            </div>

            {/* 교육과정(개발)팀 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">교육과정(개발)팀</h3>
              <p>
                <span className="font-semibold">팀장:</span> 고은지
              </p>
              <p>
                <span className="font-semibold">부팀장:</span> 김규대
              </p>
            </div>

            {/* 협력지원팀 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">협력지원팀</h3>
              <p>
                <span className="font-semibold">팀장:</span> 윤희영
              </p>
              <p>
                <span className="font-semibold">부팀장:</span> 허지혜
              </p>
            </div>

            {/* 운영팀 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">운영팀</h3>
              <p>
                <span className="font-semibold">팀장:</span> 윤선정
              </p>
              <p>
                <span className="font-semibold">부팀장:</span> 노민엽
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
