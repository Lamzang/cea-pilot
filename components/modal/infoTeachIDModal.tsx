export default function InfoTeachIDModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-customModalBg-default flex justify-center items-center z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black flex flex-col rounded-2xl p-10  z-50 gap-10"
      >
        <div className="space-y-4 border-2 rounded-3xl p-6 mt-6">
          <div className="text-lg font-semibold">교사 신분증 예시</div>

          <div className="text-gray-700">
            - 교사자격을 나타내는 면허증/자격증의 사진 또는 스캔본
          </div>

          <div className="text-gray-700">
            - 당사가 요청한 학교의 취업 상태를 보여주는 사진 또는 스캔
          </div>

          <div className="text-gray-700">
            - 교직자 신분을 나타내는 학교 신분증 사진 또는 스캔본
          </div>

          <div className="text-gray-700">
            - 정부가 인정하고 공식적으로 공인한 K-12(초등학교, 중등학교 또는
            대학 입학 전) 교육 기관으로서 조직의 지위를 증명하는 문서
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
