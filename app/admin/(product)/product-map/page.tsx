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
    <div>
      <div>
        <div className="flex gap-5 justify-between">
          <div>order method</div>
          <Link href={"/admin/new-product"}>new product</Link>
          <button>export Excel</button>
        </div>
        <div className="flex gap-5 ">
          <div className="w-80 border">name</div>
          <div className="w-60 border">category</div>
          <div className="w-60 border">price</div>
          <div className="w-60 border">stock</div>
          <div className="w-60 border">discount</div>
          <div>Detail..</div>
        </div>
        {shopData.map((data, index) => (
          <div key={index} className="flex gap-5 ">
            <div className="w-80 border">{data.name}</div>
            <div className="w-60 border">{data.category}</div>
            <div className="w-60 border">{data.price}</div>
            <div className="w-60 border">{data.stock}</div>
            <div className="w-60 border">{data.discount}</div>
            <Link href={`/admin/products/${encodeURIComponent(data.id)}`}>
              Detail..
            </Link>
          </div>
        ))}

        <div>view 30 more data</div>
      </div>
    </div>
  );
}
