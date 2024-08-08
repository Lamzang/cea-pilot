"use client";

import { db } from "@/lib/firebase/firebase";
import priceToText from "@/lib/price_to_text";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IshopData {
  name: string;
  price: number;
  id: string;
  imageUrl?: string;
}

export default function ShopHome() {
  const [shopData, setShopData] = useState<IshopData[]>([]);
  const storage = getStorage();

  useEffect(() => {
    const fetchData = async () => {
      const querysnapshots = await getDocs(collection(db, "products"));
      const dataWithImages = await Promise.all(
        querysnapshots.docs.map(async (doc) => {
          const data = doc.data() as IshopData;
          console.log(data.id);
          const imageRef = ref(storage, `/images/${data.id}/title`); // Assuming images are stored with their id as the filename
          let imageUrl;
          await getDownloadURL(imageRef)
            .then((url) => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = "blob";
              xhr.onload = (event) => {
                const blob = xhr.response;
              };
              xhr.open("GET", url);
              xhr.send();
              imageUrl = url;
            })
            .catch(() => "/assets/textbook.jpg"); // Fallback to a default image if not found
          return { ...data, imageUrl };
        })
      );
      setShopData(dataWithImages);
    };

    setShopData([]);
    fetchData();
  }, [storage]);

  return (
    <div className="py-24 my-10 flex justify-center items-center bg-gray-100 min-h-screen text-base">
      <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {shopData.map((data) => (
          <Link
            href={`/shop/${encodeURIComponent(data.id)}`}
            key={data.id}
            className="border rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-200 hover:scale-105"
          >
            <img
              className="w-full h-auto min-h-52 object-cover"
              src={data.imageUrl}
              alt={data.name}
            />
            <div className="p-4  justify-between items-center">
              <div className=" ">{data.name}</div>
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
