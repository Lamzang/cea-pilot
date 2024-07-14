import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    isLoggedIn: false,
    user: {
      username: "",
      email: "",
      uid: "",
    },
  },
});
