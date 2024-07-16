import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation";

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    userEmail: formData.get("userEmail") as string,
    password: formData.get("password") as string,
  };
  const result = {
    success: false,
    Error: "",
  };
  await signInWithEmailAndPassword(auth, data.userEmail, data.password)
    .then((userCredential) => {
      result.success = true;
      console.log("suceess");
      redirect("/");
    })
    .catch((error) => {
      console.log(error);
      result.Error = error.message;
    });

  return result;
}
