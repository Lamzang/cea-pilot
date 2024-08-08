import { atom } from "recoil";

export const cartState = atom({
  key: "productState",
  default: {
    products: [
      {
        id: "1",
        name: "product1",
        price: 10_000,
        quantity: 1,
      },
      {
        id: "2",
        name: "product2",
        price: 20_000,
        quantity: 1,
      },
    ],
    deliveryFee: 2_000,
    discount: 4_000,
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
