import Link from "next/link";
import React from "react";

interface IAuthBtn {
  type: "login" | "create-account";
  addCSS?: string;
}

const AuthBtn = ({ type, addCSS }: IAuthBtn) => {
  return (
    <div
      className={`p-1 px-3 border-gray-500 border rounded-3xl  ${
        type === "login"
          ? "text-black bg-white hover:bg-slate-100"
          : "text-white bg-customBlue-default hover:bg-customBlue-light"
      } ${addCSS}`}
    >
      <Link href={`/${type}`}>{type === "login" ? "로그인" : "회원가입"}</Link>
    </div>
  );
};

export default AuthBtn;
