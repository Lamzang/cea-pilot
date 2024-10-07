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
import { getKoreanErrorText } from "@/lib/auth_functions";
import InfoTeachIDModal from "@/components/modal/infoTeachIDModal";
import InfoQualifyModal from "@/components/modal/infoQualifyModal";
import AgreementModal from "@/components/modal/agreementModal";
import IndividualInformationAgreementModal from "@/components/modal/individualModal";

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
    individualAgreement: false,
    membershipType: "일반회원",
    password: "",
    password_confirm: "",
    selectedOptions: [],
    optionsETC: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...stateAccount, [e.target.name]: e.target.value });
  };
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);
  const [showTeachIdModal, setShowTeachIdModal] = useState(false);
  const clickTeachIdModal = () => setShowTeachIdModal(!showTeachIdModal);
  const [showQualifyModal, setShowQualifyModal] = useState(false);
  const clickQualifyModal = () => setShowQualifyModal(!showQualifyModal);
  const [showIndividualModal, setShowIndividualModal] = useState(false);
  const clickIndividualModal = () =>
    setShowIndividualModal(!showIndividualModal);

  const [error, setError] = useState<string | null>(null);
  const storage = getStorage();
  const router = useRouter();
  const [file, setFile] = useState<any>();
  const [fileQualify, setFileQualify] = useState<any>();
  const [agree, setAgree] = useState(false);
  const [agreeIndividual, setAgreeIndividual] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [optionsETC, setOptionsETC] = useState("");

  const handleOptionsETC = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionsETC(e.target.value);
  };

  const options = [
    {
      id: "연수팀",
      label:
        "[연수팀] 우리는 협력과 연구를 통해 교육의 질을 높인다. 외부 신청에 의해 나눔 연수를 운영한다.",
    },
    {
      id: "교육과정개발팀",
      label:
        "[교육과정개발팀] 개념적 이해를 강조하고 고차원적 사고를 개발하는 설계원칙을 수립하고 교육과정 개발을 위해 협력한다.",
    },
    {
      id: "협력지원팀",
      label:
        "[협력지원팀] 우리는 사례연구와 발표를 통해 전문성을 강화한다. 국내외 교육자들과 교류하며 혁신적 아이디어와 새로운 현상을 탐색한다. ",
    },
    {
      id: "연구개발팀",
      label:
        "[연구개발팀] 우리는 다양하고 전문적인 교사 연수 프로그램을 개발한다.",
    },
    {
      id: "운영팀",
      label:
        "[운영팀] 협회인들이 만나서 신뢰를 구축하고 연대할 환경을 구축한다.",
    },
  ];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, id]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== id));
    }
  };

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

  const handleQualifyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileQualify(e.target.files[0]);
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
        let fileQualifyUrl = "";
        if (file) {
          fileUrl = await handleFile(file, userCredential.user.uid);
        }
        if (fileQualify) {
          fileQualifyUrl = await handleFile(
            fileQualify,
            userCredential.user.uid
          );
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
        stateAccount.membershipType === "일반회원"
          ? await addDoc(collection(db, "mail"), {
              to: [`${stateAccount.personalEmail}`],
              message: {
                subject: "한국개념기반교육협회 회원가입을 환영합니다",
                text: "This is the plaintext section of the email body.",
                html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2>환영합니다!</h2>
  <p><strong>${stateAccount.username}</strong>님, 한국개념기반교육협회에 가입해 주셔서 감사합니다.</p>
  <p>회원가입이 승인되어서 일반회원이 되었습니다. </p>
  <br />
  <p>이제 협회에서 제공하는 다양한 혜택을 즐기실 수 있습니다. 자세한 내용은 아래 링크를 통해 확인해 주세요:</p>
  <a href="https://homepage--kcbea-portal.us-central1.hosted.app/" style="color: #1E90FF; text-decoration: none;">협회 홈페이지 방문하기</a>
  <br><br>
  <p>궁금한 점이 있으시면 언제든지 <a href="mailto:http0518@gmail.com" style="color: #1E90FF;">http0518@gmail.com</a>으로 문의해 주세요.</p>
  
  <p>감사합니다,<br><br> 한국개념기반교육협회 보냄</p>
  
  <hr>
  <p style="font-size: 12px; color: #777;">이 이메일은 자동으로 발송된 메일입니다. 답장하지 마세요.</p>
</div>

    `,
              },
            })
          : stateAccount.membershipType === "준회원(승인대기중)"
          ? await addDoc(collection(db, "mail"), {
              to: [`${stateAccount.personalEmail}`],
              message: {
                subject: "한국개념기반교육협회 회원가입을 환영합니다",
                text: "This is the plaintext section of the email body.",
                html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2>환영합니다!</h2>
  <p><strong>${stateAccount.username}</strong>님, 한국개념기반교육협회에 가입해 주셔서 감사합니다.</p>
  <p>준회원 신청이 확인되었습니다.</p>
  
  <p>준회원 승인은 협회에서 확인 절차를 거친 후에 완료됩니다. 승인 처리에는 1~2일이 소요될 수 있습니다.</p><br />
  
  <p>승인이 완료되면 안내 이메일을 보내드리며, 입금 미확인 등의 이유로 승인이 거절될 경우에도 관련 안내 메일이 발송될 예정입니다.</p>

  <br />

  
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
            })
          : stateAccount.membershipType === "정회원(승인대기중)"
          ? await addDoc(collection(db, "mail"), {
              to: [`${stateAccount.personalEmail}`],
              message: {
                subject: "한국개념기반교육협회 회원가입을 환영합니다",
                text: "This is the plaintext section of the email body.",
                html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2>환영합니다!</h2>
  <p><strong>${stateAccount.username}</strong>님, 한국개념기반교육협회에 가입해 주셔서 감사합니다.</p>
  <p>정회원 신청이 확인되었습니다.</p>
  
  <p>정회원 승인은 협회에서 확인 절차를 거친 후에 완료됩니다. 승인 처리에는 1~2일이 소요될 수 있습니다.</p><br />
  
  <p>승인이 완료되면 안내 이메일을 보내드리며, 입금 미확인 등의 이유로 승인이 거절될 경우에도 관련 안내 메일이 발송될 예정입니다.</p>

  <br />

  
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
            })
          : null;

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
          individualAgreement: stateAccount.individualAgreement,
          fileUrl: file ? fileUrl : "",
          fileQualifyUrl: fileQualify ? fileQualifyUrl : "",
          options: selectedOptions,
          optionsETC: optionsETC,

          membership: "basic",
          coupons: {
            points: 0,
            accumulated: 0,
            coupons: [],
          },
        });

        await router.push("/");
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
              직장/다른 이메일 주소 :
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
                학문정직성 및 정관에 동의합니다 (내용 보기)
              </label>
              {showModal && (
                <AgreementModal onClose={clickModal} setAgree={setAgree} />
              )}
            </div>
          </div>
          <div className="mt-4">
            <div>
              <input
                type="checkbox"
                name="individualAgreement"
                required
                checked={agreeIndividual}
                onChange={(e) => {
                  setAgreeIndividual((prev) => !prev);
                  setState({
                    ...stateAccount,
                    individualAgreement: e.target.checked,
                  });
                }}
              />
              <label onClick={clickIndividualModal} className="ml-2 text-sm">
                개인정보 수집 및 이용에 동의합니다 (약관보기)
              </label>
              {showIndividualModal && (
                <IndividualInformationAgreementModal
                  onClose={clickIndividualModal}
                  setAgree={setAgreeIndividual}
                />
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
                  value="준회원(승인대기중)"
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
                  value="정회원(승인대기중)"
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
            <div className="text-red-500 text-sm">
              * 자세한 안내는 가입 후 메일로 안내드립니다.
            </div>
          </div>

          {/* Conditional: 준회원 or 정회원 additional steps */}
          {stateAccount.membershipType === "준회원(승인대기중)" && (
            <div className="mt-4 flex flex-col gap-4">
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

              <label
                onClick={clickTeachIdModal}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                현재 상태를 나타내는 공식 교사 신분증 : (예시보기)
              </label>
              <Input
                accept="image/*,application/pdf"
                type="file"
                name="teachIDDocs"
                onChange={handleFileChange}
              />
              {showTeachIdModal && (
                <InfoTeachIDModal onClose={clickTeachIdModal} />
              )}

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
                  <span className="font-bold">협회계좌</span>
                  <br />
                  <div>은행명 : 하나은행</div>
                  <div>계좌번호 : 306-910020-43305</div>
                  <div>이름 : 한국개념기반교육협회</div>
                </div>
              </div>
            </div>
          )}

          {stateAccount.membershipType === "정회원(승인대기중)" && (
            <div className="mt-4 flex flex-col gap-4">
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
              <label
                onClick={clickTeachIdModal}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                현재 상태를 나타내는 공식 교사 신분증 : (예시보기)
              </label>
              <Input
                accept="image/*,application/pdf"
                type="file"
                name="teachIDDocs"
                onChange={handleFileChange}
              />
              {showTeachIdModal && (
                <InfoTeachIDModal onClose={clickTeachIdModal} />
              )}
              <label
                onClick={clickQualifyModal}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                자격 관련 서류 : (예시보기)
              </label>
              <Input
                accept="image/*,application/pdf"
                type="file"
                name="qualificationDocs"
                onChange={handleQualifyFileChange}
              />
              {showQualifyModal && (
                <InfoQualifyModal onClose={clickQualifyModal} />
              )}
              <div className="border-4 rounded-2xl mt-6 p-5">
                <label className="block text-sm font-medium  text-gray-700 mb-4">
                  협회에서 활동하고 싶은 부서가 있나요? (하나 이상 가능)
                </label>
                <div className="flex flex-col space-y-2">
                  {options.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={option.id}
                        type="checkbox"
                        checked={selectedOptions.includes(option.id)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={option.id}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex items-center mt-2">
                  <input
                    id="other"
                    type="checkbox"
                    checked={selectedOptions.includes("other")}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="other"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    기타
                  </label>
                  {selectedOptions.includes("other") && (
                    <input
                      type="text"
                      className="ml-4 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
                      placeholder="Other option"
                      onChange={handleOptionsETC}
                      value={optionsETC}
                    />
                  )}
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
                  <span className="font-bold">협회계좌</span>
                  <br />
                  <div>은행명 : 하나은행</div>
                  <div>계좌번호 : 306-910020-43305</div>
                  <div>이름 : 한국개념기반교육협회</div>
                </div>
              </div>
            </div>
          )}

          <button className="bg-customBlue-light text-white py-2 mt-5 rounded-md hover:bg-customBlue-dark active:scale-95 transition-transform duration-300 ease-in-out">
            회원가입
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
