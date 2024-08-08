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
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Shopping Cart</h1>
      <div className="flex flex-col space-y-4">
        {cartItems.products.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 border p-4 rounded-lg bg-white shadow-md"
          >
            <div className="w-32 text-gray-800">{item.name}</div>
            <div className="w-32 text-gray-700">{item.price} 원</div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value))
              }
              className="w-20 border rounded p-2"
            />
            <div className="w-32 text-gray-700">
              {item.price * item.quantity} 원
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-300"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="mt-5 text-lg font-bold">Total: {totalPrice} 원</div>
      <div className="mt-5">
        <Link
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          href="/cart/pay"
        >
          Proceed to Pay
        </Link>
      </div>
    </div>
  );
}
