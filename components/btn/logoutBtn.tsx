import { auth } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

const LogoutBtn = () => {
  const [userAuth, setUserAuth] = useRecoilState(authState);
  const router = useRouter();
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUserAuth({
          isLoggedIn: false,
          user: {
            username: "annoymous",
            email: "",
            uid: "basicuid",
            address: "",
            membership: "",
          },
        });
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="hover:text-orange-500" onClick={logout}>
      로그아웃
    </div>
  );
};
export default LogoutBtn;
