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
            username: "",
            email: "",
            uid: "",
          },
        });
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div
      className="p-1 px-3 border-gray-500 border rounded-3xl text-black bg-white hover:bg-slate-100 cursor-grab"
      onClick={logout}
    >
      로그아웃
    </div>
  );
};
export default LogoutBtn;