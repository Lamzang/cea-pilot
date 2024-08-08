"use client";

import { cartState } from "@/lib/recoil/product";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "AGIqf-55qFSjC7E81aiQI";

export default function Page() {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [delivery, setDelivery] = useState({
    receiver: "",
    address: "",
    addressNumber: "",
    addressDetail: "",
    phone: "",
    email: "",
  });
  const totalPrice = cartItems.products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: totalPrice + cartItems.deliveryFee - cartItems.discount,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<any | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelivery((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({
        customerKey,
      });
      setWidgets(widgets);
    }
    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      await widgets.setAmount(amount);
      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);
      setReady(true);
    }
    renderPaymentWidgets();
  }, [widgets]);
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">주문 결제</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">배송 정보</h2>
        <div className="space-y-4">
          <input
            id="receiver"
            placeholder="받는사람"
            className="w-full p-2 border rounded-lg"
            value={delivery.receiver}
            onChange={onChange}
            required
          />
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              주소 검색
            </button>
            <input
              id="addressNumber"
              placeholder="우편번호"
              className="flex-grow p-2 border rounded-lg"
              value={delivery.addressNumber}
              onChange={onChange}
              required
            />
          </div>
          <input
            id="address"
            placeholder="주소"
            className="w-full p-2 border rounded-lg"
            value={delivery.address}
            onChange={onChange}
          />
          <input
            id="addressDetail"
            placeholder="상세주소"
            className="w-full p-2 border rounded-lg"
            value={delivery.addressDetail}
            onChange={onChange}
          />
          <div className="flex space-x-4">
            <input
              id="phone"
              placeholder="휴대폰 번호"
              className="flex-grow p-2 border rounded-lg"
              value={delivery.phone}
              onChange={onChange}
              required
            />
          </div>
          <input
            id="email"
            placeholder="이메일"
            className="w-full p-2 border rounded-lg"
            value={delivery.email}
            onChange={onChange}
            required
          />
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-semibold mb-2">할인/포인트</h3>
            <div className="flex justify-between mb-2">
              <span>즉시할인</span>
              <span>-400원</span>
            </div>
            <div className="flex justify-between">
              <span>포인트</span>
              <span>-0원</span>
            </div>
          </div>
          <div className="wrapper">
            <div className="box_section">
              {/* 결제 UI */}
              <div id="payment-method" />
              {/* 이용약관 UI */}
              <div id="agreement" />
              {/* 쿠폰 체크박스 */}
              <div>
                <div>
                  <label htmlFor="coupon-box">
                    <input
                      id="coupon-box"
                      type="checkbox"
                      aria-checked="true"
                      disabled={!ready}
                      onChange={(event) => {
                        // ------  주문서의 결제 금액이 변경되었을 경우 결제 금액 업데이트 ------
                        setAmount((prevAmount) => ({
                          ...prevAmount,
                          value: event.target.checked
                            ? prevAmount.value - 5_000
                            : prevAmount.value + 5_000,
                        }));
                      }}
                    />
                    <span>5,000원 쿠폰 적용</span>
                  </label>
                </div>
              </div>

              {/* 결제하기 버튼 */}
              <button
                className="button w-full block mt-10 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                disabled={!ready}
                onClick={async () => {
                  try {
                    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.

                    //db에 저장

                    // 결제 요청
                    await widgets.requestPayment({
                      orderId: "fXl_9ipTxPAoIx1231",
                      orderName: "토스 티셔츠 외 2건",
                      successUrl: window.location.origin + "/success",
                      failUrl: window.location.origin + "/fail",
                      customerEmail: delivery.email,
                      customerName: delivery.receiver,
                      customerMobilePhone: delivery.phone,
                    });
                  } catch (error) {
                    // 에러 처리하기
                    console.error(error);
                  }
                }}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
