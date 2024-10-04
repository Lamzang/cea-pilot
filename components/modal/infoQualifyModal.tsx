export default function InfoQualifyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-customModalBg-default flex justify-center items-center z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black flex flex-col rounded-2xl p-10 w-[800px] z-50 gap-10"
      >
        <div className="space-y-4 border-2 rounded-3xl p-6 mt-6">
          <div className="text-lg font-semibold">자격 관련 서류 예시</div>

          <div className="text-gray-700">
            * 인정된 교육 프로그램: CBCI 트레이너, CBCI 시그니처 워크샵 수료자,
            CBI 온라인 코스 수료자, 개념기반 관련 교재 저자(역자), 개념기반 관련
            (소)논문 집필자, IBEC 과정 이수자, IB 월드 스쿨 근무 경력 1년 이상
            교사
          </div>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          확인
        </button>
      </div>
    </div>
  );
}
