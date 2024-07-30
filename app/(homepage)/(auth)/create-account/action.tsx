"use server";

import { doc, setDoc } from "firebase/firestore";
import bcrypt from "bcrypt";
import { z } from "zod";
import { redirect } from "next/navigation";
import { auth, db } from "@/lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username") as string,
    userEmail: formData.get("userEmail") as string,
    password: formData.get("password") as string,
    password_confirm: formData.get("password_confirm") as string,
  };
  const result = {
    success: false,
    Error: { password_confirm: [] as string[], userEmail: [] as string[] },
  };
  data.username = data.username.toLowerCase().trim();
  if (data.password !== data.password_confirm) {
    result.Error.password_confirm.push("비밀번호가 일치하지 않습니다.");
  }
  //const hashedPassword = await bcrypt.hash(data.password, 12);
  await createUserWithEmailAndPassword(auth, data.userEmail, data.password)
    .then((userCredential) => {
      setDoc(doc(db, "users", userCredential.user.email as string), {
        username: data.username,
        email: data.userEmail,
        uid: userCredential.user.uid,
      });
      result.success = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      result.Error.userEmail.push(errorMessage);
    });
  if (result.success) {
    redirect("/login");
  }
  console.log(result);
  return result;
}
