"use client";

import { db } from "@/lib/firebase/firebase";
import priceToText from "@/lib/price_to_text";
import { set } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IshopData {
  name: string;
  price: number;
  id: string;
}

export default function ShopHome() {
  const [shopData, setShopData] = useState<IshopData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const querysnapshots = await getDocs(collection(db, "shopSimpleData"));
      querysnapshots.forEach((doc) => {
        setShopData((prev) => [...prev, doc.data() as IshopData]);
      });
    };
    setShopData([]);
    fetchData();
  }, []);
  return (
    <div className="pt-24 flex justify-center items-center ">
      <div className="w-5/6 border flex flex-wrap justify-center gap-10">
        {shopData.map((data) => (
          <Link
            href={`/shop/${data.id}`}
            key={data.id}
            className="border w-96 h-[28rem]"
          >
            <img className="w-96 h-96" src="/assets/textbook.jpg" alt="img1" />
            <div className="w-full h-16 border flex justify-between">
              <div className="w-fit h-full border flex justify-center items-center">
                {data.name}
              </div>
              <div className="w-fit h-full border flex justify-center items-center">
                {priceToText(data.price) + "원"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
