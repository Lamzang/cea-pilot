import Link from "next/link";
import React from "react";

interface IAuthBtn {
  type: "login" | "create-account";
  addCSS?: string;
}

const AuthBtn = ({ type, addCSS }: IAuthBtn) => {
  return (
    <div
      className={`p-1 px-3 border-gray-500  rounded-3xl  ${
        type === "login"
          ? "text-black bg-white hover:bg-slate-200"
          : "text-white bg-blue-700 hover:bg-customBlue-light"
      } ${addCSS}`}
    >
      <Link href={`/${type}`}>{type === "login" ? "로그인" : "회원가입"}</Link>
    </div>
  );
};

export default AuthBtn;
