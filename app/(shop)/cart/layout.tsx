"use client";

import priceToText from "@/lib/price_to_text";
import { cartState } from "@/lib/recoil/product";
import Link from "next/link";
import { useRecoilState } from "recoil";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useRecoilState(cartState);
  const totalPrice = cart.products.reduce(
    (acc, product: { price: number; quantity: number }) =>
      acc + product?.price * product?.quantity,
    0
  );

  return (
    <div className="wrapper flex flex-col lg:flex-row p-4 lg:p-8 bg-gray-100 min-h-screen  gap-5">
      <div className="w-full lg:w-3/4 mb-8 lg:mb-0">{children}</div>
      <div className="w-full lg:w-1/4 flex justify-center h-fit">
        <div className="lg:fixed w-full lg:w-auto bg-white p-4 rounded-t-lg lg:rounded-lg shadow-lg lg:shadow-none lg:border lg:border-gray-200">
          <div className="mb-6">
            <h2 className="text-lg lg:text-xl font-bold mb-2">적립혜택</h2>
            <p className="text-gray-600"></p>
          </div>

          <div>
            <h2 className="text-lg lg:text-xl font-bold mb-4">결제예정금액</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">상품금액</span>
              <span className="text-gray-900 font-semibold">
                {priceToText(totalPrice)}원
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">배송비(선결제)</span>
              <span className="text-gray-900 font-semibold">
                {priceToText(cart.deliveryFee)}원
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">할인금액</span>
              <span className="text-gray-900 font-semibold">
                -{priceToText(cart.discount)}원
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-800 font-bold">합계</span>
              <span className="text-gray-900 font-bold">
                {priceToText(totalPrice + cart.deliveryFee - cart.discount)}원
              </span>
            </div>
            {/* <Link
              className="mt-10 block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              href="/cart/pay"
            >
              주문하기
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
