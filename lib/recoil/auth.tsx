import { IChatUser, IUser, IUserDoc } from "@/constant/interface";
import { atom } from "recoil";

export const authState = atom<IUser | null>({
  key: "authState",
  default: null,
});

export const chatAuthState = atom<IChatUser | null>({
  key: "chatAuthState",
  default: null,
});

export const userDocState = atom<IUserDoc | null>({
  key: "userDocState",
  default: null,
});
