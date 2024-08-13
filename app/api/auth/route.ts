import { db } from "@/lib/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, email, uid } = await req.json();
  try {
    setDoc(doc(db, "users", "user.uid"), {
      username: username,
      email: email,
      uid: uid,
      address: "",
      membership: "basic",
      coupons: {
        points: 0,
        accumulated: 0,
        coupons: [],
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json((error as any).response.body, {
      status: (error as any).response.statusCode,
    });
  }
}
