"use client";

import { db } from "@/lib/firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AdminUserDetail({
  params,
}: {
  params: { userId: string };
}) {
  const [userData, setUserData] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>([]);

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

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-2xl font-bold mb-4">User Details</div>
      <div className="grid grid-cols-2 gap-4 mb-6 w-1/3">
        <div className="font-semibold">User Name:</div>
        <div>{userData.username}</div>
        <div className="font-semibold">Phone Number:</div>
        <div>{userData.phoneNumber}</div>
        <div className="font-semibold">Email:</div>
        <div>{userData.email}</div>
        <div className="font-semibold">UID:</div>
        <div>{userData.uid}</div>
        <div className="font-semibold">Address:</div>
        <div>{userData.address}</div>
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
