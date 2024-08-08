import got from "got";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { paymentKey, orderId, amount } = await req.json();
  const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
  const encryptedSecretKey =
    "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

  try {
    const response = await got.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        json: {
          orderId: orderId,
          amount: amount,
          paymentKey: paymentKey,
        },
        responseType: "json",
      }
    );

    // 결제 성공 비즈니스 로직을 구현하세요.
    return NextResponse.json(response.body, { status: response.statusCode });
  } catch (error) {
    // 결제 실패 비즈니스 로직을 구현하세요.
    return NextResponse.json((error as any).response.body, {
      status: (error as any).response.statusCode,
    });
  }
}
