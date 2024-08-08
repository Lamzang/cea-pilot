"use client";

import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IshopData {
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  id: string;
  discount: number;
}

export default function AdminProductMap() {
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
    <div className="p-5">
      <div>
        <div className="flex gap-5 justify-between mb-4">
          <div className="text-lg font-semibold">Order Method</div>
          <Link
            href="/admin/new-product"
            className="text-blue-500 hover:underline"
          >
            New Product
          </Link>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Export Excel
          </button>
        </div>
        <div className="flex gap-5 bg-gray-100 p-2 rounded mb-2">
          <div className="w-80 font-semibold">Name</div>
          <div className="w-60 font-semibold">Category</div>
          <div className="w-60 font-semibold">Price</div>
          <div className="w-60 font-semibold">Stock</div>
          <div className="w-60 font-semibold">Discount</div>
          <div className="font-semibold">Detail</div>
        </div>
        {shopData.map((data, index) => (
          <div key={index} className="flex gap-5 p-2 border-b">
            <div className="w-80">{data.name}</div>
            <div className="w-60">{data.category}</div>
            <div className="w-60">{data.price}</div>
            <div className="w-60">{data.stock}</div>
            <div className="w-60">{data.discount}</div>
            <Link
              href={`/admin/products/${encodeURIComponent(data.id)}`}
              className="text-blue-500 hover:underline"
            >
              Detail..
            </Link>
          </div>
        ))}
        <div className="text-blue-500 cursor-pointer hover:underline mt-4">
          View 30 more data
        </div>
      </div>
    </div>
  );
}
