export default function IndividualInformationAgreementModal({
  onClose,
  setAgree,
}: {
  onClose: () => void;
  setAgree: (value: boolean) => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-customModalBg-default flex justify-center items-center z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black flex flex-col gap-5 rounded-2xl p-4 w-full max-w-3xl h-4/6 sm:h-[95vh] overflow-y-auto z-50"
      >
        <div className="  p-2">
          <h2 className="sm:text-2xl font-bold">개인정보 수집 및 이용 동의</h2>
        </div>

        <div className=" border-2 p-2">
          <p>1. 개인정보 수집·이용목적</p>
          <p>
            한국개념기반교육협회는 수집한 개인정보를 다음의 목적을 위해
            활용합니다. 또한 협회가 수집한 개인정보는 협회 홈페이지 서비스 제공
            및 아래 이외의 목적으로는 일체 사용되지 않습니다.
          </p>
          <p>
            가. 회원 관리 및 회원가입에 따른 본인 식별,인증 절차에 이용, 회원제
            서비스 이용에 따른 본인확인, 불량회원의 부정 이용 방지와 비인가 사용
            방지, 가입 의사 확인, 분쟁 조정을 위한 기록보존, 불만처리 등
            민원처리, 협회 행사 및 소식지 정보 제공(이메일), 고지사항 전달
          </p>
          {/** 협회에서 할 일을 위한 개인정보 수집 동의  */}
          <br />
          <p> 2. 개인정보 수집 항목 및 이용목적</p>
          <p>
            한국개념기반교육협회 홈페이지에서는 원활한 서비스 제공을 위해
            최소한의 개인정보를 수집하고 있으며, 회원유형에 따라 다음과 같은
            개인정보를 수집하고 있습니다.
          </p>
          <br />
          <p>
            개인이메일주소 이름 휴대폰번호 비밀번호, 직장 및 다른 이메일 주소,
            소속 지역 교육청, 학교이름 및 교육기관 이름, 전공 또는 학년,
            공식교사신분증(사진또는 파일), 자격관련 서류
          </p>
          <p>개인정보 수집방법 : 홈페이지(회원가입)</p>
          <br />
          <p> 3. 개인정보 보유 및 이용기간</p>
          <p>
            한국개념기반교육협회 홈페이지에서는 정보주체의 회원 가입일로부터
            탈퇴일까지 서비스를 제공하는 기간 동안에 한하여 최소한의 개인정보를
            보유 및 이용 하게 됩니다. 회원가입 등을 통해 개인정보의
            수집․이용․제공 등에 대해 동의하신 내용은 언제든지 철회하실 수
            있습니다. 회원 탈퇴시 개인정보는 지체없이 파기합니다.
          </p>
          <br />
          <p> 4. 개인정보 수집 동의 거부 권리</p>
          <p>
            정보주체는 개인정보의 수집·이용에 대한 동의를 거부할 수 있습니다.
            동의 거부시 한국개념기반교육협회 홈페이지에 회원가입이 되지 않으며,
            한국개념기반교육협회 홈페이지에서 제공하는 일부 서비스를 이용할 수
            없습니다.
          </p>
          <br />
          <p> 5. 수집한 개인정보 위탁</p>
          <p>
            협회는 회원의 개인정보를 외부 업체에 위탁 및 제공하지 않습니다. 향후
            그러한 필요가 생길경우 별도의 동의를 받은 후에만 제공할 예정입니다.
          </p>
        </div>

        <button
          onClick={() => {
            onClose();
            setAgree(true);
          }}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          동의합니다
        </button>
      </div>
    </div>
  );
}
