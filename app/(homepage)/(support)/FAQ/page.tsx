import { auth } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from "recoil";

export default function Page() {
  return <div>FAQ</div>;
}
