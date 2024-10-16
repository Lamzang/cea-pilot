/* "use server";

import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { auth, db } from "@/lib/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username") as string,
    userEmail: formData.get("personalEmail") as string,
    password: formData.get("password") as string,
    password_confirm: formData.get("password_confirm") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    region: (formData.get("region") as string) || "",
    school: (formData.get("school") as string) || "",
    major: (formData.get("major") as string) || "",
    schoolEmail: (formData.get("schoolEmail") as string) || "",
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
    .then(async (userCredential) => {
      console.log(userCredential);
      await updateProfile(userCredential.user, {
        displayName: data.username,
      });
      await addDoc(collection(db, "chat-standby"), {
        uid: userCredential.user.uid,
        email: data.userEmail,
        displayName: data.username,
        time: new Date().toISOString(),
        membership: "standby",
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: data.username,
        email: data.userEmail,
        uid: userCredential.user.uid,
        address: "",
        phoneNumber: data.phoneNumber,
        region: data.region,
        school: data.school,
        major: data.major,
        schoolEmail: data.schoolEmail,

        membership: "basic",
        coupons: {
          points: 0,
          accumulated: 0,
          coupons: [],
        },
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
 */
