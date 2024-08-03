"use client";

import { db } from "@/lib/firebase/firebase";
import priceToText from "@/lib/price_to_text";
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
      const querysnapshots = await getDocs(collection(db, "products"));
      querysnapshots.forEach((doc) => {
        setShopData((prev) => [...prev, doc.data() as IshopData]);
      });
    };
    setShopData([]);
    fetchData();
  }, []);

  return (
    <div className="pt-24 flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {shopData.map((data) => (
          <Link
            href={`/shop/${encodeURIComponent(data.id)}`}
            key={data.id}
            className="border rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-200 hover:scale-105"
          >
            <img
              className="w-full h-96 object-cover"
              src="/assets/textbook.jpg"
              alt={data.name}
            />
            <div className="p-4 flex justify-between items-center">
              <div className="font-semibold text-lg">{data.name}</div>
              <div className="text-gray-500">
                {priceToText(data.price) + "원"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
