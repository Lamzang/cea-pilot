"use client";

import { auth } from "@/lib/firebase/firebase";
import { signOut, updateProfile } from "firebase/auth";
import { useState } from "react";

export default function ProfileModal({
  user,
  onClose,
}: {
  user: any;
  onClose: () => void;
}) {
  const [name, setName] = useState(user.displayName);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
    }

    onClose();
    window.location.reload();
  };
  const onLogout = () => {
    signOut(auth);
    onClose();
  };
  return (
    <div className="absolute bottom-0 left-0 w-full flex justify-center z-50">
      <div onClick={onClose} className="fixed top-0 left-0 w-full h-full" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black flex flex-col rounded-2xl p-6 w-80 shadow-lg mt-4 z-50"
      >
        <div className="my-4">
          <form onSubmit={onSubmit} className=" flex flex-col gap-4">
            <input
              value={name || ""}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              수정
            </button>
          </form>
          <div
            onClick={onLogout}
            className="mt-4 text-red-500 cursor-pointer hover:underline text-center"
          >
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}
