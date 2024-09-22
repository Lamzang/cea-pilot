import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    isLoggedIn: false,
    user: {
      username: "annoymous",
      email: "",
      uid: "basicuid",
      address: "",
      membership: "basic",
    },
  },
});
