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
      setDoc(doc(db, "users", userCredential.user.uid), {
        username: data.username,
        email: data.userEmail,
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

/* const checkPassword = ({
    password,
    password_confirm,
  }: {
    password: string;
    password_confirm: string;
  }) => {
    return password === password_confirm;
  }; */
/* const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "이름은 문자열이어야 합니다.",
        required_error: "이름을 입력하세요.",
      })
      .toLowerCase()
      .trim(),
    userEmail: z.string().email().toLowerCase(),
    password: z.string().min(4),
    password_confirm: z.string().min(4),
  })
  .refine(
    ({ password, password_confirm }) =>
      checkPassword({ password, password_confirm }),
    {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["password_confirm"],
    }
  ); */
/*    .superRefine(async ({ username }, ctx) => {
    if ((await isNameUnique(username)) === false) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 이름입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  }) */
/*   .superRefine(async ({ userEmail }, ctx) => {
    if ((await isEmailUnique(userEmail)) === false) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 이메일입니다.",
        path: ["userEmail"],
        fatal: true,
      });
      return z.NEVER;
    }
  }) */

/* export async function ZodCreateAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username") as string,
    userEmail: formData.get("userEmail") as string,
    password: formData.get("password") as string,
    password_confirm: formData.get("password_confirm") as string,
  };
  const result = await formSchema.spa(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 12);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.userEmail,
        hashedPassword
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: data.username,
        email: data.userEmail,
      });
      redirect("/login");
    } catch (error) {
      const errorCode = (error as any).code;
      const errorMessage = (error as any).message;
      return {
        success: false,
        Error: { fieldErrors: { userEmail: errorMessage } },
      };
    }
  }
} */
