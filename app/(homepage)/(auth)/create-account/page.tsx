"use client";

import React, { useState } from "react";
import Input from "@/components/input";
import GoogleSignUp from "@/app/(homepage)/(auth)/googleSignUp";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

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
    membershipType: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...stateAccount, [e.target.name]: e.target.value });
  };
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="flex justify-center items-center h-full bg-gray-50">
      <div className="border bg-white shadow-md rounded-lg my-16 w-full max-w-2xl p-8 flex flex-col justify-center gap-6">
        <div className="flex justify-center text-3xl font-bold text-gray-800 mb-4">
          회원가입
        </div>

        {/* Step 1: 기본 정보 */}
        <form action={dispatch} className="flex flex-col gap-4">
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

          {/* Step 2: 동의안 서명 */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              동의안 서명 :
            </label>
            <div>
              <input
                type="checkbox"
                name="agreement"
                onChange={(e) =>
                  setState({ ...stateAccount, agreement: e.target.checked })
                }
              />
              <label className="ml-2 text-sm">
                학문정직성 및 정관에 동의합니다
              </label>
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
                  name="membershipType"
                  value="일반회원"
                  onChange={handleInputChange}
                />
                <label className="ml-2">일반회원</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="membershipType"
                  value="준회원"
                  onChange={handleInputChange}
                />
                <label className="ml-2">준회원</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="membershipType"
                  value="정회원"
                  onChange={handleInputChange}
                />
                <label className="ml-2">정회원</label>
              </div>
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
                교원 인증 :
              </label>
              <Input type="file" name="teacherVerification" required />
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
                자격 관련 서류 업로드 :
              </label>
              <Input type="file" name="qualificationDocs" required />
            </div>
          )}

          <button className="bg-customBlue-light text-white py-2 mt-5 rounded-md hover:bg-customBlue-dark transition duration-300">
            회원가입
          </button>
        </form>
        <div className="mt-4">
          <GoogleSignUp />
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
