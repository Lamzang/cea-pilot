"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IPyamentInfo {
  orderId: string | null;
  paymentKey: string | null;
  amount: string | null;
}

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentInfo, setPaymentInfo] = useState<IPyamentInfo>();
  useEffect(() => {
    const paymentType = searchParams.get("paymentType");
    const orderId = searchParams.get("orderId");
    const paymentKey = searchParams.get("paymentKey");
    const amount = searchParams.get("amount");
    setPaymentInfo({ paymentKey, orderId, amount });

    async function confirm() {
      const requestData = {
        paymentKey: paymentKey,
        orderId: orderId,
        amount: amount,
      };
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const json = await response.json();
      if (!response.ok) {
        console.log(json);
        router.push(`/fail?message=${json.message}&code=${json.code}`);
      }
      console.log(json);
    }
    confirm();
  }, []);
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">결제가 완료되었습니다!</h1>
        <p className="text-gray-700 mb-4">주문이 성공적으로 완료되었습니다.</p>
        <div className="mb-6">
          <div className="text-lg font-semibold mb-2">주문 번호</div>
          <div className="text-gray-900 mb-4">{paymentInfo?.orderId}</div>
          <div className="text-lg font-semibold mb-2">결제금액</div>
          <div className="text-gray-900 mb-4">{paymentInfo?.amount}</div>
          <div className="text-lg font-semibold mb-2">paymentKey</div>
          <div className="text-gray-900 mb-4">{paymentInfo?.paymentKey}</div>
        </div>
      </div>
    </div>
  );
}
