"use client";

import { db } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface IShopDetailData {
  name: string;
  price: number;
  id: string;
  category: string;
  description: string;
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
  }, [params.shopId]);

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
    setReview("");
    setRating(0);
  };

  return (
    <div className="pt-24 flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-5/6 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="w-full md:w-1/2 h-auto">
            <img
              className="w-full h-auto rounded-lg"
              src="/assets/textbook.jpg"
              alt={shopData?.name}
            />
          </div>
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-semibold mb-4">{shopData?.name}</h2>
            <div className="text-xl text-gray-800 mb-4">
              {shopData?.price}원
            </div>
            <p className="text-gray-700 mb-4">{shopData?.description}</p>
            <div className="flex gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                장바구니
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                바로구매
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">상품소개 이미지</h3>
          {/* Add product introduction images here */}
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">리뷰</h3>
          <div>
            {reviewData.map((data, index) => (
              <div key={index} className="border-b py-4">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{data.userId}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(data.reviewDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-yellow-500 mr-2">{data.rating} ★</div>
                  <div>{data.content}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="mt-6">
            <input
              onChange={onChange}
              value={review}
              placeholder="리뷰를 작성해주세요"
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="number"
              onChange={onRating}
              value={rating}
              placeholder="별점 (1-5)"
              className="w-full p-2 border rounded mb-4"
              min={1}
              max={5}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              제출
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
