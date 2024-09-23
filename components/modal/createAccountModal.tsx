"use client";

import { useState } from "react";
import Input from "../input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export default function CreateAccountModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    password: "",
    password_confirm: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value ?? "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (formData.password !== formData.password_confirm) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.email || !formData.displayName || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      // Implement your account creation logic here (Firebase, etc.)
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      ).then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: formData.displayName,
        });
        await addDoc(collection(db, "chat-standby"), {
          uid: userCredential.user.uid,
          email: formData.email,
          displayName: formData.displayName,
          time: new Date().toISOString(),
          membership: "standby",
        });
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: formData.displayName,
          email: formData.email,
          uid: userCredential.user.uid,
          address: "",
          phoneNumber: "",
          region: "",
          school: "",
          major: "",
          schoolEmail: "",
          membershipType: "임시회원",
          agreement: false,
          fileUrl: "",

          membership: "basic",
          coupons: {
            points: 0,
            accumulated: 0,
            coupons: [],
          },
        });
      });
      await onClose(); // Close modal after successful creation
    } catch (err) {
      console.error("Error creating account: ", err);
      setError("Account creation failed. " + err);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full flex justify-center z-50">
      <div onClick={onClose} className="fixed top-0 left-0 w-full h-full " />
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white text-black flex flex-col rounded-2xl p-6 w-80 shadow-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-105 gap-2"
      >
        <>
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="displayName">이름</label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            placeholder="이름"
            value={formData.displayName || ""}
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={formData.password || ""}
            onChange={handleChange}
            required
          />
        </>
        <>
          <label htmlFor="password_confirm">비밀번호 확인</label>
          <Input
            id="password_confirm"
            name="password_confirm"
            type="password"
            placeholder="비밀번호 확인"
            value={formData.password_confirm || ""}
            onChange={handleChange}
            required
          />
        </>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
