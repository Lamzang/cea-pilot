import { IUser } from "@/constant/interface";
import { atom } from "recoil";

export const authState = atom<IUser | null>({
  key: "authState",
  default: null,
});

export const chatAuthState = atom({
  key: "chatAuthState",
  default: null,
});
