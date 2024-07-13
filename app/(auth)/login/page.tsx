import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border w-1/4 h-2/4 flex flex-col justify-center content-between gap-5">
        <div className=" flex justify-center text-3xl font-bold">로그인</div>
        <div className=" flex flex-col">
          <div>
            <label htmlFor="email">이메일 : </label>
            <input className="border" placeholder="이메일을 입력하세요" />
          </div>

          <div>
            <label htmlFor="password">비밀번호 : </label>
            <input className="border" placeholder="비밀번호를 입력하세요" />
          </div>
        </div>
        <div>Google로 로그인</div>
        <div>로그인</div>
      </div>
    </div>
  );
};

export default Login;
