"use client";

import { db } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

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

interface IReviewData {
  userId: string;
  content: string;
  rating: number;
  reviewDate: string;
}

export default function ShopEach({ params }: { params: { shopId: string } }) {
  const [shopData, setShopData] = useState<IShopDetailData>();
  const [reviewData, setReviewData] = useState<IReviewData[]>([]);
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [userData, setUserData] = useRecoilState(authState);
  useEffect(() => {
    const fetchData = async () => {
      const querysnapshots = await getDoc(
        doc(db, "products", decodeURIComponent(params.shopId))
      );
      setShopData(querysnapshots.data() as IShopDetailData);
      console.log(querysnapshots.data());
    };
    const fetchReviewData = async () => {
      const querysnapshots = await getDocs(
        collection(db, "products", decodeURIComponent(params.shopId), "reviews")
      );
      querysnapshots.forEach((doc) => {
        setReviewData((prev) => [...prev, doc.data() as IReviewData]);
      });
    };
    fetchData();
    fetchReviewData();
  }, []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };
  const onRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDoc(
      collection(db, "products", decodeURIComponent(params.shopId), "reviews"),
      {
        userId: userData.user.username,
        content: review,
        rating: rating,
        reviewDate: new Date().toISOString(),
      }
    );

    /* 
    updateDoc(doc(db, "products", params.shopId), {
      reviews: [...(shopData?.reviews ?? []), review],
    }); */
    setReview("");
    setRating(0);
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
            {reviewData.map((data, index) => (
              <div key={index} className="flex gap-2">
                <div>{data.userId}</div>
                <div>{data.content}</div>
                <div>{data.rating}</div>
                <div>{data.reviewDate}</div>
              </div>
            ))}
            <form onSubmit={onSubmit}>
              <input onChange={onChange} value={review} />
              <input type="number" onChange={onRating} value={rating} />
              <button>submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
