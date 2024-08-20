"use client";

import Link from "next/link";
import { useRecoilState } from "recoil";
import { cartState } from "@/lib/recoil/product";

interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Page() {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(
      (prevItems: {
        products: {
          id: string;
          name: string;
          price: number;
          quantity: number;
        }[];
        deliveryFee: number;
        discount: number;
        delivery: {
          receiver: string;
          address: string;
          addressNumber: string;
          addressDetail: string;
          phone: string;
          email: string;
        };
      }) => ({
        ...prevItems,
        products: prevItems.products.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(
      (prevItems: {
        products: {
          id: string;
          name: string;
          price: number;
          quantity: number;
        }[];
        deliveryFee: number;
        discount: number;
        delivery: {
          receiver: string;
          address: string;
          addressNumber: string;
          addressDetail: string;
          phone: string;
          email: string;
        };
      }) => ({
        ...prevItems,
        products: prevItems.products.filter(
          (item: ICartItem) => item.id !== id
        ),
      })
    );
  };

  const totalPrice = cartItems.products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <div className="p-4 sm:p-5 w-full">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">
        Shopping Cart
      </h1>
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {cartItems.products.map((item) => (
          <div
            key={item.id}
            className="sm:w-full flex flex-col sm:flex-row items-center justify-start sm:justify-between  space-y-2 border p-3 sm:p-4 rounded-lg bg-white shadow-md"
          >
            <div className="w-full sm:w-fit text-gray-800">{item.name}</div>
            <div className="w-full sm:w-max text-gray-700">
              단가 : {item.price} 원
            </div>
            <div className="w-full sm:w-max h-fit">
              <label className="text-gray-700">수량 : </label>
              <input
                id="amount"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="w-16 sm:w-20 border rounded p-2 text-center"
              />
            </div>

            <div className="w-full sm:w-fit text-gray-700">
              총금액 :{item.price * item.quantity} 원
            </div>
            <div className="w-full sm:w-fit flex justify-start">
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-300"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 sm:mt-5 text-lg font-bold">
        Total: {totalPrice} 원
      </div>
      <div className="mt-4 sm:mt-5">
        <Link
          className="block w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-center"
          href="/cart/pay"
        >
          Proceed to Pay
        </Link>
      </div>
    </div>
  );
}
