"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    // db에서 orderId와 amount, paymentKey 가져오기
    async function confirm() {
      //const response = await fetch();
    }
  }, []);
  return (
    <div>
      <h1>Success</h1>
      <p>Thank you for your purchase!</p>
    </div>
  );
}
