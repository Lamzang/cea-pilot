"use client";

import { auth, db } from "@/lib/firebase/firebase";
import { updateProfile } from "firebase/auth";
import { set } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminUserDetail({
  params,
}: {
  params: { userId: string };
}) {
  const [userData, setUserData] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>([]);
  const [membership, setMembership] = useState("");
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e: any) => {
    setMembership(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", params.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    const fetchOrderData = async () => {
      const querysnapshots = await getDocs(
        collection(db, "users", params.userId, "orders")
      );
      querysnapshots.forEach((doc) => {
        setOrderData((prev: any) => [...prev, doc.data()]);
      });
    };
    fetchData();
    fetchOrderData();
  }, [params.userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const onSubmit = async () => {
    const docRef = doc(db, "users", params.userId);
    updateDoc(docRef, {
      membershipType: membership,
    });
    setUserData({ ...userData, membershipType: membership });
    setSubmitted(true);
    alert("멤버십이 변경되었습니다.");
  };

  const sendMailToUser = async () => {
    if (membership === "정회원") {
      sendMail(
        "12시간 이상 연수/동일 자격, 각종 온오프라인 협회 행사 초대 및 연수 할인 혜택, 운영진으로서 역할 수행 가능, 협회 메신저 초대"
      );
      alert("정회원 승인메일이 발송되었습니다.");
      router.push("/admin/users");
    } else if (membership === "준회원") {
      sendMail("협회 기본 자료 열람 가능");
      alert("준회원 승인메일이 발송되었습니다.");
      router.push("/admin/users");
    } else {
      alert("준회원과 정회원만 승인메일을 보낼 수 있습니다.");
    }
    setSubmitted(false);
  };

  const sendMail = async (advantage: string) => {
    addDoc(collection(db, "mail"), {
      to: [`${userData.email}`],
      message: {
        subject: `한국개념기반교육협회 ${userData.membershipType}이 된것을 환영합니다.`,
        text: "",
        html: `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
<h2>환영합니다!</h2>
<p><strong>${userData.username}</strong>님, 한국개념기반교육협회 ${userData.membershipType}이 된것을 환영합니다.</p>
<br />

<p>협회의 ${userData.membershipType}으로서 다음과 같은 혜택을 얻을 수 있습니다.</p>


    <p>
      ${advantage}
    </p>

<p style="color: red">
* 또한 올해 가입하는 회원은 연회비 적용을 2025년 연말까지 적용합니다.
</p>
<br />
              

<p>협회에서 제공하는 다양한 혜택을 즐기실 수 있습니다. 자세한 내용은 아래 링크를 통해 확인해 주세요:</p>
<a href="https://kcbea.com/" style="color: #1E90FF; text-decoration: none;">협회 홈페이지 방문하기</a>

<br><br>
<p>궁금한 점이 있으시면 언제든지 <a href="mailto:graceshinnz@gmail.com" style="color: #1E90FF;">graceshinnz@gmail.com</a>으로 문의해 주세요.</p>

<p>감사합니다,<br>한국개념기반교육협회 팀</p>

<hr>
<p style="font-size: 12px; color: #777;">이 이메일은 자동으로 발송된 메일입니다. 답장하지 마세요.</p>
</div>

`,
      },
    });
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md pb-20">
      <div className="text-2xl font-bold mb-4">User Details</div>
      <div className="grid grid-cols-2 gap-4 mb-6 w-1/3">
        <div className="font-semibold">User Name:</div>
        <div>{userData.username}</div>
        <div className="font-semibold">Phone Number:</div>
        <div>{userData.phoneNumber}</div>
        <div className="font-semibold">Email:</div>
        <div>{userData.email}</div>
        <div className="font-semibold">직장/다른 이메일 주소:</div>
        <div>{userData.schoolEamil}</div>
        <div className="font-semibold">UID(고유ID):</div>
        <div>{userData.uid}</div>
        <div className="font-semibold">현재 주소:</div>
        <div>{userData.address}</div>
        <div className="font-semibold">major:</div>
        <div>{userData.major}</div>
        <div className="font-semibold">school:</div>
        <div>{userData.school}</div>
        <div className="font-semibold">교사 신분증:</div>

        <Link
          href={userData?.fileUrl ?? ""}
          target="_blank"
          rel="noopener noreferrer"
        >
          {userData.fileUrl ? (
            <span className="flex gap-2 hover:bg-slate-100">
              <Image
                src={"/assets/svg/download.svg"}
                width={20}
                height={20}
                alt="download"
              />{" "}
              파일 다운로드
            </span>
          ) : (
            "파일 없음"
          )}
        </Link>
        <div className="font-semibold">자격 관련 서류:</div>
        <Link
          href={userData?.fileQualifyUrl ?? ""}
          target="_blank"
          rel="noopener noreferrer"
        >
          {userData.fileQualifyUrl ? (
            <span className="flex gap-2 hover:bg-slate-100">
              <Image
                src={"/assets/svg/download.svg"}
                width={20}
                height={20}
                alt="download"
              />{" "}
              파일 다운로드
            </span>
          ) : (
            "파일 없음"
          )}
        </Link>
        <div className="font-semibold">설문조사:</div>
        <div className="">
          {userData?.options.map((data: any, index: any) => (
            <div key={index}>{data}</div>
          ))}
          <div>{userData?.optionETC}</div>
        </div>
      </div>
      <div className="flex mt-8 mb-10 gap-10">
        <div className=" w-1/2">
          <h2 className="text-2xl font-semibold mb-4">멤버십 변경하기</h2>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="mb-4">
              <span className="font-semibold">현재 멤버십:</span>
              <span className="ml-2">{userData.membershipType}</span>
            </div>
            <div className="mb-6">
              <label htmlFor="membership" className="block font-semibold mb-2">
                변경할 멤버십:
              </label>
              <select
                onChange={onChange}
                id="membership"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="일반회원">일반회원</option>
                <option value="준회원">준회원</option>
                <option value="정회원">정회원</option>
                <option value="멤버">멤버</option>
                <option value="관리자">관리자</option>
              </select>
            </div>
            <div className="flex flex-col  gap-5">
              <button
                onClick={onSubmit}
                className="bg-blue-600 text-white  font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                저장하기
              </button>
              {submitted &&
                (userData.membershipType === "준회원" ||
                  userData.membershipType === "정회원") && (
                  <button
                    onClick={sendMailToUser}
                    className="bg-blue-600 text-white  font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    멤버십 승인메일 전송하기
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xl font-semibold mb-2">Order History</div>
      <div className="border-t-2 border-b-2 border-gray-300 py-2">
        <div className="grid grid-cols-5 gap-4 font-semibold bg-gray-200 p-2 rounded-md">
          <div>Product Name</div>
          <div>Each Price</div>
          <div>Quantity</div>
          <div>OrderDate</div>
          <div>Address</div>
        </div>
        {orderData?.map((data: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 p-2 border-b last:border-none"
          >
            <div>{data.products}</div>
            <div>{data.price}</div>
            <div>{data.totalAmount}</div>
            <div>{data.orderDate}</div>
            <div>{data.shippingAddress}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
