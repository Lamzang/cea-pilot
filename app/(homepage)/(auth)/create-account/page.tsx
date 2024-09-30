"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { on } from "events";
import { getKoreanErrorText } from "@/lib/auth_functions";

const CreateAccount = () => {
  const [stateAccount, setState] = useState({
    username: "",
    phoneNumber: "",
    region: "",
    school: "",
    major: "",
    schoolEmail: "",
    personalEmail: "",
    agreement: false,
    membershipType: "일반회원",
    password: "",
    password_confirm: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...stateAccount, [e.target.name]: e.target.value });
  };
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);
  const [error, setError] = useState<string | null>(null);
  const storage = getStorage();
  const router = useRouter();
  const [file, setFile] = useState<any>();
  const [agree, setAgree] = useState(false);

  const handleFile = async (file: any, uid: any) => {
    const storageReference = storageRef(
      storage,
      `uploads/${uid}/${file?.name}`
    );
    const snapshot = await uploadBytes(storageReference, file);
    const fileUrl = await getDownloadURL(snapshot.ref);
    return fileUrl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    await e.preventDefault();
    if (stateAccount.password !== stateAccount.password_confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    await createUserWithEmailAndPassword(
      auth,
      stateAccount.personalEmail,
      stateAccount.password
    )
      .then(async (userCredential) => {
        let fileUrl = "";
        if (file) {
          fileUrl = await handleFile(file, userCredential.user.uid);
        }
        await updateProfile(userCredential.user, {
          displayName: stateAccount.username,
        });
        await addDoc(collection(db, "chat-standby"), {
          uid: userCredential.user.uid,
          email: stateAccount.personalEmail,
          displayName: stateAccount.username,
          time: new Date().toISOString(),
          membership: "standby",
        });
        /* await addDoc(collection(db, "mail"), {
          to: [`${stateAccount.personalEmail}`],
          message: {
            subject: "한국개념기반교육협회 회원가입을 환영합니다",
            text: "This is the plaintext section of the email body.",
            html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2>환영합니다!</h2>
  <p><strong>${stateAccount.username}</strong>님, 한국개념기반교육협회에 가입해 주셔서 감사합니다.</p>
  
  <p>준회원 및 정회원 신청은 협회에서 승인 절차를 거친 후에 완료됩니다. 승인 처리에는 1~2일이 소요될 수 있습니다.</p>
  
  <p>승인이 완료되면 안내 이메일을 보내드리며, 입금 미확인 등의 이유로 승인이 거절될 경우에도 관련 안내 메일이 발송될 예정입니다.</p>
  
  <p>협회에서 제공하는 다양한 혜택을 즐기실 수 있습니다. 자세한 내용은 아래 링크를 통해 확인해 주세요:</p>
  <a href="https://homepage--kcbea-portal.us-central1.hosted.app/" style="color: #1E90FF; text-decoration: none;">협회 홈페이지 방문하기</a>
  
  <br><br>
  <p>궁금한 점이 있으시면 언제든지 <a href="mailto:http0518@gmail.com" style="color: #1E90FF;">http0518@gmail.com</a>으로 문의해 주세요.</p>
  
  <p>감사합니다,<br>한국개념기반교육협회 팀</p>
  
  <hr>
  <p style="font-size: 12px; color: #777;">이 이메일은 자동으로 발송된 메일입니다. 답장하지 마세요.</p>
</div>

    `,
          },
        }); */

        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: stateAccount.username,
          email: stateAccount.personalEmail,
          uid: userCredential.user.uid,
          address: "",
          phoneNumber: stateAccount.phoneNumber,
          region: stateAccount.region,
          school: stateAccount.school,
          major: stateAccount.major,
          schoolEmail: stateAccount.schoolEmail,
          membershipType: stateAccount.membershipType,
          agreement: stateAccount.agreement,
          fileUrl: file ? fileUrl : "",

          membership: "basic",
          coupons: {
            points: 0,
            accumulated: 0,
            coupons: [],
          },
        });

        await router.push("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage + "error");

        setError(getKoreanErrorText(errorCode));
      });
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-50">
      <div className="border bg-white shadow-md rounded-lg my-16 w-full max-w-2xl p-8 flex flex-col justify-center gap-6">
        <div className="flex justify-center text-3xl font-bold text-gray-800 mb-4">
          회원가입
        </div>

        {/* Step 1: 기본 정보 */}
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이름 :
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="이름을 입력하세요"
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              전화번호 :
            </label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="전화번호를 입력하세요"
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="personalEmail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              개인 이메일 주소 :
            </label>
            <Input
              id="personalEmail"
              name="personalEmail"
              type="email"
              placeholder="개인 이메일을 입력하세요"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="schoolEmail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              학교/기관 이메일 주소 :
            </label>
            <Input
              id="schoolEmail"
              name="schoolEmail"
              type="email"
              placeholder="학교 이메일을 입력하세요"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호 :
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="password_confirm"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호 확인 :
            </label>
            <Input
              id="password_confirm"
              name="password_confirm"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Step 2: 동의안 서명 */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              동의안 서명 :
            </label>
            <div>
              <input
                type="checkbox"
                name="agreement"
                required
                checked={agree}
                onChange={(e) => {
                  setAgree((prev) => !prev);
                  setState({ ...stateAccount, agreement: e.target.checked });
                }}
              />
              <label onClick={clickModal} className="ml-2 text-sm">
                학문정직성 및 정관에 동의합니다
              </label>
              {showModal && (
                <AgreementModal onClose={clickModal} setAgree={setAgree} />
              )}
            </div>
          </div>

          {/* Step 3: 회원 유형 선택 */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              회원 유형 선택 :
            </label>
            <div className="flex gap-4">
              <div>
                <input
                  type="radio"
                  id="generalMemberRadioInput"
                  name="membershipType"
                  value="일반회원"
                  required
                  onChange={handleInputChange}
                />
                <label htmlFor="generalMemberRadioInput" className="ml-2">
                  일반회원
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="semiMemberRadioInput"
                  name="membershipType"
                  value="준회원"
                  required
                  onChange={handleInputChange}
                />
                <label htmlFor="semiMemberRadioInput" className="ml-2">
                  준회원
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="MemberRadioInput"
                  name="membershipType"
                  value="정회원"
                  required
                  onChange={handleInputChange}
                />
                <label htmlFor="MemberRadioInput" className="ml-2">
                  정회원
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-2 rounded-3xl p-6">
            <div className="text-xl font-bold">회원정보</div>

            <div className="text-gray-700">
              <span className="font-semibold">일반회원:</span> 일반소식 접근
            </div>

            <div className="text-gray-700">
              <span className="font-semibold">준회원:</span> 기본 자료 접근
            </div>

            <div className="text-gray-700">
              <span className="font-semibold">정회원:</span> 12시간 이상
              연수/동일 자격, 각종 온오프라인 협회 행사 초대 및 연수 할인 혜택,
              운영진으로서 역할 수행 가능
            </div>

            <div className="text-red-500 text-sm">
              * 준회원과 정회원은 가입 신청 후 승인까지 주말 제외한 1~2일이
              소요됩니다.
            </div>
          </div>

          {/* Conditional: 준회원 or 정회원 additional steps */}
          {stateAccount.membershipType === "준회원" && (
            <div className="mt-4">
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  소속 지역 교육청 :
                </label>
                <Input
                  id="region"
                  name="region"
                  type="text"
                  placeholder="소속 지역 교육청을 입력하세요"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="school"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  학교 이름 또는 교육 기관 이름 :
                </label>
                <Input
                  id="school"
                  name="school"
                  type="text"
                  placeholder="학교 또는 기관 이름을 입력하세요"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="major"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  전공 또는 학년 :
                </label>
                <Input
                  id="major"
                  name="major"
                  type="text"
                  placeholder="전공 또는 학년을 입력하세요"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                교원 인증 :
              </label>
              <Input type="file" name="teacherVerification" required />

              <div className="border-t-2 border-b-2 my-8 p-2 flex">
                <div className="w-1/2 border-r-2 p-2">
                  <p>
                    <span className="font-bold">입회비와 회비 안내</span>
                    <br /> <br /> 가. 정회원 연회비 : 100,000원 <br /> 나.
                    정회원 가입비 : 20,000원 <br /> 다. 준회원 연회비 : 50,000원{" "}
                    <br /> 라. 준회원 가입비 : 20,000원 <br />
                    마. 일반회원: 가입비 없음
                  </p>
                </div>
                <div className="w-1/2 p-2 pl-5 h-full flex flex-col justify-center">
                  <span className="font-bold">후원계좌</span>
                  <br />
                  <div>은행명 : 하나은행</div>
                  <div>계좌번호 : 306-910020-43305</div>
                  <div>이름 : 한국개념기반교육협회</div>
                </div>
              </div>
            </div>
          )}

          {stateAccount.membershipType === "정회원" && (
            <div className="mt-4">
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  소속 지역 교육청 :
                </label>
                <Input
                  id="region"
                  name="region"
                  type="text"
                  placeholder="소속 지역 교육청을 입력하세요"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="school"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  학교 이름 또는 교육 기관 이름 :
                </label>
                <Input
                  id="school"
                  name="school"
                  type="text"
                  placeholder="학교 또는 기관 이름을 입력하세요"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="major"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  전공 또는 학년 :
                </label>
                <Input
                  id="major"
                  name="major"
                  type="text"
                  placeholder="전공 또는 학년을 입력하세요"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="schoolEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  학교/기관 이메일 주소 :
                </label>
                <Input
                  id="schoolEmail"
                  name="schoolEmail"
                  type="email"
                  placeholder="학교 이메일을 입력하세요"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                현재 상태를 나타내는 공식 교사 신분증 :
              </label>
              <Input
                accept="image/*,application/pdf"
                type="file"
                name="qualificationDocs"
                onChange={handleFileChange}
              />
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
                  - 정부가 인정하고 공식적으로 공인한 K-12(초등학교, 중등학교
                  또는 대학 입학 전) 교육 기관으로서 조직의 지위를 증명하는 문서
                </div>
              </div>
              <div className="border-t-2 border-b-2 my-8 p-2 flex">
                <div className="w-1/2 border-r-2 p-2">
                  <p>
                    <span className="font-bold">입회비와 회비 안내</span>
                    <br /> <br /> 가. 정회원 연회비 : 100,000원 <br /> 나.
                    정회원 가입비 : 20,000원 <br /> 다. 준회원 연회비 : 50,000원{" "}
                    <br /> 라. 준회원 가입비 : 20,000원 <br />
                    마. 일반회원: 가입비 없음
                  </p>
                </div>
                <div className="w-1/2 p-2 pl-5 h-full flex flex-col justify-center">
                  <span className="font-bold">후원계좌</span>
                  <br />
                  <div>은행명 : 하나은행</div>
                  <div>계좌번호 : 306-910020-43305</div>
                  <div>이름 : 한국개념기반교육협회</div>
                </div>
              </div>
            </div>
          )}

          <button className="bg-customBlue-light text-white py-2 mt-5 rounded-md hover:bg-customBlue-dark transition duration-300">
            회원가입
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;

function AgreementModal({
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
        className="bg-white text-black flex flex-col gap-5 rounded-2xl p-4 w-full max-w-3xl h-full max-h-[95vh] overflow-y-auto z-50"
      >
        <div className=" border-2 p-2">
          <h2 className="text-lg font-bold mb-4">
            {"<학문적 정직성 및 저작권 보호에 관한 정책 문서>"}
          </h2>
          <div className="h-52 overflow-y-auto">
            <p>개정: 2024.00.00</p>
            <p>한국 개념 기반 교육 협회</p>
            <p className="mt-2">
              <span className="font-bold">목적</span>
              <br /> 본 문서는 한국 개념 기반 교육 협회 회원들이 학문적 정직성을
              유지하고, 저작권법을 준수하며 학문적 활동을 수행할 때 따라야 할
              원칙과 절차를 규정한다. 이 문서는 회원의 창작물 보호와 타인의
              저작물 공정 사용을 통해 교육과 연구에서의 윤리적 기준을 강화하는
              데 기여하고자 한다. 또한, AI 도구(예: ChatGPT) 사용 시 준수해야 할
              정보 및 학문적 윤리 기준을 명확히 규정한다.
              <br /> <br /> <span className="font-bold">
                정책범위
              </span> <br /> 이 정책은 협회 소속 모든 회원에게 적용되며, 이들이
              작성하는 수업자료, 창작물, 소논문 및 기타 모든 산출물에 적용된다.
              <br />
              <br />
              <span className="font-bold">학문적 정직성의 정의</span>
              <br /> 학문적 정직성은 교육자들이 지식과 정보를 생산, 공유,
              사용하는 과정에서 정직함과 투명성을 유지하는 것을 의미한다. 주요
              원칙은 다음과 같다:
              <br /> 표절 및 부정행위 금지: 모든 형태의 표절과 부정행위는 엄격히
              금지되며, 이를 위반할 경우 회원 활동에 대한 제재를 받는다.
              <br /> 출처 명시: 타인의 아이디어, 연구 결과, 자료 등을 사용할
              때는 반드시 출처(APA 형식)를 정확히 명시해야 한다.
              <br /> AI 도구 사용의 투명성: AI 도구(예: ChatGPT)를 사용하여
              생성된 자료를 활용할 경우, 그 사용 사실을 명확히 밝혀야 하며, 이를
              교육자 개인의 독창적 창작물로 간주하지 않는다.
              <br />
              <br /> <span className="font-bold">정책 세부 내용</span>
              <br /> 1. 협회 내 창작물의 저작권
              <br /> 협회 활동과 관련된 창작물: 회원이 협회 활동 및 자격증
              과정에서 제작한 저작물은 협회와 개인 양자에게 귀속되며, 타인의
              저작물일 경우 동의를 통해 공유한다.
              <br /> 2. 타인의 저작물 사용과 공정 이용 수업목적의 사용: 회원은
              저작권법 제25조에 따라, 수업목적으로 타인의 저작물을 상식적인 범위
              내에서 인용할 수 있다. 이 경우, 해당 자료는 대면 수업에만
              사용되어야 하며, 다른 용도로 사용되면 저작권 침해로 간주될 수
              있다. 공정 이용과 출처 표시: 타인의 저작물을 바탕으로 학술 자료를
              제작할 경우, 공정 이용(저작권법 제35조의3)과 출처 표시(저작권법
              제37조) 규정을 준수해야 한다. 공정 이용은 비영리 목적의 경우에만
              허용되며, 원저작물에 대한 시장 대체효과가 없어야 한다.
              <br /> 3. AI 도구(예: ChatGPT) 사용 및 인용 AI 도구 사용 허용:
              회원은 협회의 학술적 활동에서 ChatGPT와 같은 AI 도구를 사용할 수
              있다. 단, AI 도구가 생성한 텍스트, 그림, 그래프 등은 반드시 인용
              표시와 함께 본문과 참고 문헌 목록에 출처를 명시해야 한다. 인용 및
              참고 문헌 명시: AI 도구를 통해 생성된 콘텐츠는 협회에서 사용하는
              인용 스타일에 따라 인용 부호와 함께 출처를 표기해야 하며, 참고
              문헌 목록에는 AI 도구에 제공한 프롬프트와 생성 날짜를 포함해야
              한다. 예시: 본문 인용: &quot;이 도구와 변수의 개발은...&quot;
              (OpenAI, 2023). 참고 문헌: OpenAI. (2023, February 23). ChatGPT
              response to example prompt about example topic. AI 도구 사용의
              윤리적 원칙: 회원은 AI 도구가 생성한 자료가 특정 관점으로 편향될
              수 있음을 인지하고, 이를 비판적으로 평가해야 한다. AI 도구의
              자료를 무비판적으로 수용하지 않도록 주의해야 하며, 이를 활용한
              창작물에 대해 충분히 이해하고 설명할 수 있어야 한다.
              <br /> 4. 저작권 분쟁 예방 저작권 분쟁 예방을 위한 조치: 저작권
              침해가 의심되는 상황에서는 가능한 한 법적 분쟁을 피하기 위해
              사전에 저작권자의 허락을 받는 것이 중요하다. 저작권자의 허락 없이
              타인의 저작물을 사용한 자료를 외부에 공개하는 것은 분쟁을 유발할
              수 있다.
              <br /> <br /> <span className="font-bold">위반시 제재</span>
              <br /> 학문적 정직성 및 저작권 관련 규정을 위반한 경우, 다음과
              같은 제재가 적용될 수 있다: 첫 번째 위반: 구두 또는 서면 경고 두
              번째 위반: 해당 과제나 제출물의 수정 및 재작성 요구 및 협회 활동
              제한 세 번째 위반: 협회 내 모든 활동에서의 영구적 제명 및 법적
              조치
              <br /> <br /> <span className="font-bold">책임 및 보고절차</span>
              <br /> 투명성 강조: 모든 회원은 학문적 정직성 및 저작권 준수에
              대한 책임이 있으며, 위반 사례를 발견할 경우 협회
              학술위원회(교육과정개발팀)에 즉시 보고해야 한다. 위원회 조사:
              학술위원회(교육과정개발팀)는 접수된 신고를 검토하고 필요한 조사를
              수행한 후, 적절한 조치를 취한다.
              <br /> <br /> <span className="font-bold">정책의 재검토</span>
              <br /> 본 정책은 학문적 및 법적 환경의 변화에 따라 정기적으로
              재검토되며, 필요 시 수정된다. 회원은 최신 정책을 숙지하고 준수해야
              한다.
            </p>
          </div>
        </div>

        <div className=" border-2 p-2">
          <h2 className="text-lg font-bold mb-2">
            한국 개념 기반 교육 협회 정관
          </h2>

          <div className="h-52 overflow-y-auto mt-4">
            <p>2024년 7월 29일 개정</p>
            <p>
              <br />
              <span className="font-bold">제1장 총 칙</span>
              <br />
              제1조(목적) 이 협회는 민법 제32조 및 교육부 소관 비영리법인의 설립
              및 감독에 관한 규칙 제4조에 따라 본 협회는 “교육적 사명감을
              바탕으로 미래 교육을 선도하며, 생각하는 교실을 통해 개념적 이해를
              전이하는 평생 학습을 양성하고, 협력적 공동체를 실현한다.”는
              목적으로 한다.
              <br />
              제2조(명칭) 이 협회는 “한국개념기반교육협회(Korea Concept-Based
              Education Association)” 라고 한다.
              <br />
              제3조(사무소의 소재지) 본 협회의 사무소는 부산광역시에 둔다.
              필요에 따라 지부를 둘 수 있다.
              <br />
              제4조(사업) 본 협회는 제1조의 목적을 달성하기 위하여 다음과 같은
              목적 사업을 행한다. 교육의 질 향상을 위한 협력과 회원의 연구활동
              조성사업 협회 연대 구축에 관한 협의회 지원사업 회원의 전문성
              강화를 위한 개념 기반 교육 사례 연구 및 나눔 지원사업 체계적이고
              전문적인 교사 연수 프로그램 지원사업 개념적 이해를 강조하고
              고차원적 사고를 지원하는 교육과정 개발사업 국내외의 개념 기반
              교육에 관한 정보 교류와 공동연구 및 지원사업
              <br />
              <br />
              <span className="font-bold">제2장 회 원</span>
              <br />
              제5조(회원의 종류 및 자격) 본회의 회원은 일반회원, 준회원,
              정회원으로 구분한다. 일반회원의 자격: 가입비 없이 개인 기초 정보를
              제공하는 자 준회원의 자격: 준회원 회비(가입 및 연회비)를 납부하고
              이사회의 승인을 받은 자 정회원의 자격: 다음 각목에 모두 해당하는
              자 가. 입회원서를 제출하고, 이사회의 승인을 얻은 자 나. 정회원
              회비(가입 및 연회비)를 납부한 자 다. 협회 교육 프로그램(인정된
              동일한 교육 프로그램)을 이수한 자 *인정된 교육 프로그램: CBCI
              트레이너, CBCI 시그니처 워크숍 수료자, CBI 온라인 코스 수료자,
              개념기반 관련 교재 저자(역자), 개념기반 관련 (소)논문 집필자, IBEC
              과정 이수자, IB 월드 스쿨 근무 경력 1년 이상 교사
              <br />
              제6조(회원의 권리와 의무) ①본 회의 회원은 회원 등급에 따라 회비를
              납부하고 그 권리와 의무를 갖는다. ②일반회원의 권리는 다음과 같다.
              기초 자료를 열람할 수 있는 권리 ③준회원의 권리는 다음과 같다. 기본
              자료를 열람하고 다운로드할 수 있는 권리 총회 참석하는 권리 별도의
              특별 준회원을 선정하고, 교육과정 자료 연간 구독권을 받을 수 있는
              권리 ④정회원의 권리는 다음과 같다. 총회 참석 및 표결하는 권리
              임원의 선거권 및 피선거권 기본 자료를 열람하거나 자료를 업로드할
              수 있는 권리 본회의 각종 사업에 참가하고, 각종 출판물을 제공받을
              권리 민간자격증을 발급받을 수 있으면 연수 강사로 출강할 수 있는
              권리(협회 교육 프로그램 이수자) ⑤회원의 의무는 다음과 같다. 본회
              회칙 및 관계규정을 준수할 의무 본회에서 행하는 결의사항을 준수할
              의무 소정의 회비를 회원제의 등급에 따라 납부할 의무
              <br /> 제7조(회원의 탈퇴) 본 회의 회원은 임의로 탈퇴할 수 있다.
              <br /> 제8조(회원의 견책, 제명) 본 회의 회원으로서 본 회의 목적에
              배치되는 행위 또는 명예․위신에 손상을 가져오는 행위를 하였을
              때에는 이사회의 의결로써 회장이 제명할 수 있다.
              <br />
              <br />
              <span className="font-bold">제3장 임 원</span>
              <br /> 제9조(임원의 종류와 정수) 본 협회에 다음의 임원을 둔다.
              이사 4명 대표이사(회장) 1명, 상임이사(부회장) 1명,
              학술연구이사1명, 고문이사 1명) 2. 감사 1명 3. 부서장 4명(운영부장
              1명, 연구개발부장 1명, 협력지원부장 1명, 연수부장 1명)
              <br /> 제10조(회장 및 임원의 임기) 회장 및 이사(부회장 포함),
              감사의 임기는 2년으로 하되, 연임할 수 있다. 다만 최초의 임원
              반수의 임기는 그 반에 해당하는 기간으로 정한다.
              <br /> 제11조(회장 및 임원의 선임방법) ①회장은 총회에서 선출한다.
              단, 초기회장은 설립 목적을 위해 임의 선출한다. ②부회장은 회장이
              지명하며, 이사는 본회 정회원 중에서 회장이 지명한다. ③임원은
              정회원의 자격으로 임원의 임기 중 결원이 생긴 때에는 총회에서
              보선하고, 보선에 의하여 취임한 임원의 임기는 전임자의 잔여기간으로
              한다. ④제4조에 규정한 사업을 전담하게 하기 위하여 회장은 이사회의
              의결을 거쳐 부서장을 임명할 수 있다. 부서장의 업무분장에 관하여는
              회장이 정한다.
              <br /> 제12조(회장 및 이사의 직무) ①회장은 본회를 대표하고 협회
              업무를 통괄한다. ②이사는 이사회에 출석하여 본회의 업무에 관한
              사항을 의결하며, 이사회 또는 회장으로부터 위임받은 사항을
              처리한다.
              <br />
              제13조(회장 직무대행자의 지명) 회장의 유고시에는 회장이 지명하는
              부회장이 회장의 직을 대행한다.
              <br /> 제14조(감사의 직무) 감사는 다음의 직무를 행한다. 1. 협회의
              재산상황을 감사하는 일 2. 이사회의 운영과 그 업무에 관한 사항을
              감사하는 일 3. 감사 결과 부정 또는 불법한 점이 있음을 발견할
              때에는 이를 이사회, 총회에 그 시정을 요구하고 그래도 시정치 않을
              때에는 감독청에 보고하는 일 4. 제3호의 보고를 하기 위하여 필요한
              때에는 총회 또는 이사회의 소집을 요구하는 일 5. 협회의 재산상황
              또는 총회, 이사회의 운영과 그 업무에 관한 사항에 대하여 총회, 회장
              또는 이사회에서 의견을 진술하는 일 6. 총회 및 이사회의 회의록에
              기명․날인하는 일
              <br />
              <br /> <span className="font-bold">제4장 총 회</span>
              <br /> 제15조(총회의 기능) 총회는 다음의 사항을 의결한다. 1.
              임원의 선출과 의결에 관한 사항 정관 변경에 관한 사항 예산 및
              결산의 승인 사업계획의 승인 기타 중요 사항
              <br /> 제16조(총회의 소집) ①총회는 정기총회와 임시총회로 나누되,
              정기총회는 연1회 10월중에 소집하고, 임시총회는 필요에 따라 회장이
              소집한다. ②회장은 회의 안건을 명기하여 7일전에 각 회원에게
              통지하여야 한다. ③총회는 제2항의 통지사항에 한하여만 의결할 수
              있다.
              <br /> 제17조(총회의 의결정족수) ①총회는 재적회원 과반수의
              출석으로 개회한다. ②총회의 의사는 출석한 회원 과반수의 찬성으로
              의결한다. 다만, 가부동수인 경우에는 의장이 결정한다. <br />
              제18조(총회소집의 특례) ①회장은 다음 각 호의 1에 해당하는
              소집요구가 있을 때에는 그 소집요구 일로부터 20일 이내에 총회를
              소집하여야 한다. 1. 재적이사 과반수가 회의의 목적사항을 제시하여
              소집을 요구한 때 2. 제16조 제4호의 규정에 의하여 감사가 소집을
              요구한 때 3. 회원 3분의 1이상이 회의의 목적사항을 제시하여 소집을
              요구한 때 ②총회 소집권자가 궐위되거나 또는 이를 기피함으로써
              총회소집이 불가능할 때에는 재적이사 과반수 또는 회원 3분의 1이상의
              찬성으로 감독청의 승인을 얻어 총회를 소집할 수 있다. ③제2항에 의한
              총회는 출석이사 중 연장자의 사회아래 그 의장을 지명한다.
              <br /> 제19조(총회의결 제척사유) 의장 또는 회원이 다음 각 호의 1에
              해당하는 때에는 그 의결에 참여하지 못한다. 1. 임원취임 및 해임에
              있어 자신에 관한 사항 2. 금전 및 재산의 수수를 수반하는 사항 등
              회원 자신과 법인과의 이해가 상반되는 사항
              <br /> 제20조(표결위임) 부득이한 사유로 회의에 출석할 수 없는
              회원은 다른 회원에게 표결권을 위임할 수 있다.
              <br /> 제21조(총회의 의사록) 총회의 의사에 관하여는 다음에
              제기하는 사항을 기재한 의사록을 작성하여 의장과 출석한 이사가
              기명날인한다. 1. 회의일시, 장소 2. 회원의 현재 수 3. 출석한 회원
              수 (표결위임 한 회원 포함) 4. 의결사항 5. 의사의 경과, 요령 및
              결과
              <br />
              <br /> <span className="font-bold">
                제5장 이 사 회
              </span> <br /> 제22조(이사회의 기능) 이사회는 다음의 사항을
              심의․결정한다. 1. 업무집행에 관한 사항 2. 사업계획 운영에 관한
              사항 3. 예산 및 결산서 작성에 관한 사항 4. 총회에서 위임받은 사항
              5. 이 정관에 의하여 그 권한에 속하는 사항 6. 기타 중요한 사항
              <br />
              제23조(의결정족수) ①이사회는 이사정수의 과반수가 출석하지 아니하면
              개회하지 못한다. ②이사회의 의사는 출석이사 과반수의 찬성으로
              의결한다. 다만, 가부동수인 경우에는 의장이 결정한다.
              <br /> 제24조(의결제척 사유) 회장 또는 이사가 다음 각 호의 1에
              해당하는 때에는 그 의결에 참여하지 못한다. 1. 임원의 취임 및
              해임에 있어 자신에 관한 사항을 의결할 때 2. 금전 및 재산의 수수를
              수반하는 사항 등 자신과 법인의 이해가 상반될 때 <br />
              제25조(이사회의 소집) ①이사회는 회장이 소집하고 그 의장이 된다.
              ②이사회를 소집하고자 할 때에는 적어도 회의 7일전에 목적사항을
              명시하여 각 이사에게 통지하여야 한다. ③이사회는 제2항의 통지사항에
              한하여서만 의결할 수 있다. 다만, 재적이사 전원이 출석하고 출석이사
              전원의 찬성이 있을 때에는 통지하지 아니한 사항이라도 이를 부의하고
              의결할 수 있다.
              <br /> 제26조(이사회소집의 특례) ① 회장은 다음 각 호의 1에
              해당하는 소집요구가 있을 때에는 그 소집요구일로부터 20일 이내에
              이사회를 소집하여야 한다. 1. 재적이사 과반수로부터 회의의
              목적사항을 제시하여 소집을 요구한 때 2. 제16조 제4호의 규정에
              의하여 감사가 소집을 요구한 때 ② 이사회 소집권자가 궐위되거나 또는
              이를 기피함으로써 7일 이상 이사회 소집이 불가능할 때에는 재적이사
              과반수의 찬성으로 감독청의 승인을 얻어 소집할 수 있다. ③ 제2항에
              의한 이사회의 운영은 출석 이사 중 연장자의 사회아래 그 회의의
              의장을 선출하여야 한다.
              <br />
              제27조(서면의결 금지) 이사회의 의사는 서면의결에 의할 수 없다.
              <br />
              <br /> <span className="font-bold">제6장 재산 및 회계</span>{" "}
              <br />
              제28조(재산의 구분) ①본 협회의 재산은 기본재산과 운영재산으로
              구분한다. ②다음 각 호의 1에 해당하는 재산은 이를 기본재산으로
              하고, 기본재산 이외의 일체의 재산은 운영재산으로 한다. 1. 설립 시
              기본재산으로 출연한 재산 2. 기부에 의하거나 기타 무상으로 취득한
              재산. 다만, 기부목적에 비추어 기본재산으로 하기 곤란하여 총회의
              승인을 얻은 것은 예외로 한다. 3. 운영재산 중 총회에서 기본재산으로
              편입할 것을 의결한 재산 4. 세계(歲計)잉여금 중 적립금 ③본 협회의
              기본재산은 다음과 같다. 1. 설립당시의 기본재산은 별지목록 1과
              같다. 2. 현재의 기본재산은 별지목록 2와 같다.
              <br /> 제29조(재산의 관리) ①제28조 제3항의 기본재산을 매도, 증여,
              임대, 교환하거나, 담보에 제공하거나 의무부담 또는 권리의 포기를
              하고자 할 때에는 이사회의 의결과 총회의 승인을 받아야 한다.
              ②법인이 매수, 기부채납, 기타의 방법으로 재산을 취득할 때에는 지체
              없이 이를 법인의 재산으로 편입조치 하여야 한다. ③기본재산 및
              운영재산의 유지, 보존 및 기타 관리 (제1항 및 제2항의 경우를
              제외한다)에 관하여는 회장이 정하는 바에 의한다. ④기본재산의
              목록이나 평가액에 변동이 있을 때에는 지체 없이 별지목록2(현재의
              기본재산목록)를 변경하여 정관변경 절차를 밟아야 한다.
              <br /> 제30조(재산의 평가) 본 협회의 모든 재산의 평가는 취득당시의
              시가에 의한다.
              <br /> 제31조(경비의 조달방법 등) 본 협회의 유지 및 운영에 필요한
              경비는 기본재산의 과실, 사업수익, 회원의 회비 및 기타의 수입으로
              조달한다.
              <br /> 제32조(회원의 경비) 회원의 회비는 이사회에서 별도로 정하되
              그 납부기한은 당해 연도 3월말까지로 한다.
              <br /> 제33조(회계의 구분) ①본 협회의 회계는 목적사업회계와
              수익사업회계로 구분한다. ②제1항의 경우에 법인세법의 규정에 의한
              법인세 과세대상이 되는 수익과 이에 대응하는 비용은 수익사업회계로
              계리하고, 기타의 수익과 비용은 목적사업회계로 계리한다. ③제2항의
              경우에 목적사업회계와 수익사업회계로 구분하기 곤란한 비용은
              법인세에 관한 법령의 규정을 준용하여 배분한다.
              <br /> 제34조(회계원칙) 본 협회의 회계는 사업의 경영성과와 수지
              상태를 정확하게 파악하기 위하여 모든 회계거래를 발생의 사실에
              의하여 기업회계의 원칙에 따라 처리한다.
              <br />
              제35조(회계연도) 본 협회의 회계연도는 정부의 회계연도에 따른다.
              <br />
              제36조(예산외의 채무부담 등) 예산외의 채무의 부담 또는 채권의
              포기는 이사회의 의결과 총회의 승인을 받아야 한다.
              <br /> 제37조(임원 등에 대한 재산대여 금지) ①본 협회의 재산은 이
              법인과 다음 각 호의 1에 해당하는 관계가 있는 자에 대하여는 정당한
              대가없이 이를 대여하거나 사용하게 할 수 없다. 1. 본 협회의 설립자
              2. 본 협회의 임원 3. 제1호 및 제2호에 해당하는 자와 민법 제777조의
              규정에 의한 친족관계에 있는 자 또는 이에 해당하는 자가 임원으로
              있는 다른 법인 4. 이 협회와 재산상 긴밀한 관계가 있는 자 ②제1항
              각호의 규정에 해당되지 아니하는 자의 경우에도 법인의 목적에 비추어
              정당한 사유가 없는 한 정당한 대가 없이 대여하거나 사용하게 할 수
              없다.
              <br />
              제38조(예산서 및 결산서 제출) 이 협회는 매 회계연도 종료 후 2월
              이내에 다음 각 호의 서류를 이사회의 의결과 총회의 승인을 얻어
              감독청에 제출한다. 1. 다음 사업연도의 사업계획 및 수지예산서 2.
              당해 사업연도의 사업실적 및 수지결산서 3. 당해 사업연도말 현재의
              재산목록
              <br />
              제39조(기부금모금 및 공개) ①이 협회의 목적사업을 위해 기부금 및
              후원금을 모금할 수 있고 경비로 사용할 수 있다. ②이 협회의 목적사업
              시행을 위하여 기부금을 모금할 수 있으며 연간 기부금의 모금액 및
              활용실적은 홈페이지를 통하여 다음해 3월말까지 공개한다.
              <br />
              <br /> <span className="font-bold">제7장 보 칙</span>
              <br />
              제40조(정관변경) 본 협회 정관을 변경하고자 할 때에는 총회에서
              재적회원 3분의 2이상의 찬성으로 의결하여 다음 각 호의 서류를
              첨부하여 감독청의 허가를 받아야 한다. 1. 변경사유서 1부 2.
              정관개정안(신․구대조표를 포함한다) 1부 3. 정관의 변경에 관한 총회
              또는 이사회회의록 등 관련서류 1부 4. 기본재산의 처분에 따른
              정관변경의 경우에는 처분의 사유, 처분재산의 목록, 처분의 방법 등을
              기재한 서류 1부. <br />
              제41조(해산) 이 협회을 해산하고자 할 때에는 총회에서 재적회원
              3분의 2 이상의 찬성으로 의결하여 감독청의 허가를 받아야 하며,
              청산인은 파산의 경우를 제하고는 그 취임 후 3주간 내에 해산 등기를
              하고 등기부등본을 첨부하여 감독청에 해산신고를 하여야 한다.
              <br /> 제42조(잔여재산의 귀속) 이 협회가 해산할 때의 잔여재산은
              단체가 지정한 자연인으로 귀속된다.
              <br /> 제43조(시행세칙) 회비징수에 관한 사항 등 이 정관의 시행에
              관하여 필요한 사항은 이사회에서 정하여 총회의 승인을 얻어야 한다.
              <br /> 제44조(설립당초의 임원 및 임기) 이 협회 설립 당초의 임원 및
              임기는 다음과 같다. 대표이사(회장): 신은정(2년) 상임이사(부회장):
              김병일(2년) 학술연구이사: 고은지(2년) 고문이사: 윤희영(2년) 감사:
              윤선정(2년)
              <br />
              <br /> <span className="font-bold"> 부 칙</span> <br />{" "}
              제1조(시행일) 이 정관은 주무관청의 허가를 받은 날(2024년 7월
              29일)부터 시행한다.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
            setAgree(true);
          }}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          확인
        </button>
      </div>
    </div>
  );
}
