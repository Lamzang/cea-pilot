"use client";

import { db } from "@/lib/firebase/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface IShopDetailData {
  name: string;
  price: number;
  id: string;
  category: "string";
  description: "string";
  stock: number;
  discount: number;
  reviews: string[];
}

export default function ShopEach({ params }: { params: { shopId: string } }) {
  const [shopData, setShopData] = useState<IShopDetailData>();
  const [review, setReview] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      const querysnapshots = await getDoc(
        doc(db, "shopDetailData", params.shopId)
      );
      setShopData(querysnapshots.data() as IShopDetailData);
    };
    fetchData();
  }, []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateDoc(doc(db, "shopDetailData", params.shopId), {
      reviews: [...(shopData?.reviews ?? []), review],
    });
    setReview("");
  };
  return (
    <div className="pt-24 flex justify-center items-center">
      <div className="w-5/6 border flex flex-col">
        <div className="border w-full flex">
          <div className="w-1/2 h-auto border ">
            <img className="w-full h-auto" src="/assets/textbook.jpg" />
          </div>
          <div className="w-1/2 border ">
            <div>{shopData?.name}</div>
            <div>{shopData?.price}</div>
            <div>{shopData?.description}</div>
            <div className="flex gap-2">
              <div className="border">장바구니</div>
              <div className="border">바로구매</div>
            </div>
          </div>
        </div>
        <div>상품소개 이미지</div>
        <div>
          <div>review data</div>
          <div>
            <div>order</div>
            {/* <div>
              <div className="flex">
                <img />
                <div>name</div>
              </div>
              <div className="flex ">
                <div>review star</div>
                <div>date</div>
              </div>
              <div>review content</div>
            </div> */}
            {shopData?.reviews.map((review) => (
              <div key={review}>{review}</div>
            ))}
            <form onSubmit={onSubmit}>
              <input onChange={onChange} value={review} />
              <button>submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
