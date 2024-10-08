import { atom } from "recoil";

export const cartState = atom({
  key: "productState",
  default: {
    products: [],
    deliveryFee: 0,
    discount: 0,
    delivery: {
      receiver: "",
      address: "",
      addressNumber: "",
      addressDetail: "",
      phone: "",
      email: "",
    },
  },
});
