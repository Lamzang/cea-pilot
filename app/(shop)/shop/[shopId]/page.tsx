"use client";

import { db } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import { cartState } from "@/lib/recoil/product";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Link from "next/link";
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
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [imageUrl, setImageUrl] = useState<string>();
  const [subtitleImageUrlArray, setSubtitleImageUrlArray] = useState<string[]>(
    []
  );
  const [descriptionImageUrl, setDescriptionImageUrl] = useState<string>();
  const storage = getStorage();
  const [amount, setAmount] = useState<number>(1);
  const [showImage, setShowImage] = useState<string>();

  /*   useEffect(() => {
    const fetchImg = async () => {
      const imageRef = ref(
        storage,
        `/images/${decodeURIComponent(params.shopId)}/title`
      );
      await getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
          setShowImage(url);
        })
        .catch(() => "/assets/textbook.jpg");
    };

    const fetchSubtitleImg = async () => {
      const images: string[] = [];
      for (let i = 0; i < 5; i++) {
        try {
          const subtitleImageRef = ref(
            storage,
            `/images/${decodeURIComponent(params.shopId)}/subtitle${i}`
          );
          const url = await getDownloadURL(subtitleImageRef);
          images.push(url);
        } catch (error) {
          console.error(error);
        }
      }
      setSubtitleImageUrlArray(images);
    };

    const fetchDescriptionImg = async () => {
      const imageRef = ref(
        storage,
        `/images/${decodeURIComponent(params.shopId)}/description`
      );
      await getDownloadURL(imageRef)
        .then((url) => setDescriptionImageUrl(url))
        .catch(() => "/assets/textbook.jpg");
    };

    fetchImg();
    fetchSubtitleImg();
    fetchDescriptionImg();
  }, [params.shopId, storage]);

  const onClick = () => {
    setCartItems((prev) => ({
      ...prev,
      products: [
        ...(prev.products || []),
        {
          id: shopData?.id || "",
          name: shopData?.name || "",
          price: shopData?.price || 0,
          quantity: amount,
        },
      ],
    }));
  };

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(
      collection(db, "products", decodeURIComponent(params.shopId), "reviews"),
      {
        userId: userData?.displayName,
        content: review,
        rating: rating,
        reviewDate: new Date().toISOString(),
      }
    );
    setReview("");
    setRating(0);
  };
 */
  return (
    <div className="py-16 sm:py-24 flex justify-center items-center bg-gray-100 min-h-screen">
      {/* <div className="w-full sm:w-5/6 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="w-full md:w-1/2 h-auto p-4 sm:p-14">
            <img
              className="w-full h-auto max-w-xs sm:max-w-sm rounded-lg"
              src={showImage}
              alt={"Product Image"}
            />
          </div>
          <div className="w-full md:w-1/2 p-4 sm:p-20 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">
                {shopData?.name}
              </h2>
              <div className="text-lg sm:text-xl text-gray-800 mb-2 sm:mb-4">
                {shopData?.price}원
              </div>
              <p className="text-gray-700 mb-4 border-t-2 py-4">
                {shopData?.description}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <div>수량 :</div>
                <input
                  className="border w-16 sm:w-20 p-2 rounded"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  type="number"
                  min="1"
                />
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4">
              <div
                onClick={onClick}
                className="flex-1 bg-blue-500 text-white px-2 sm:px-4 py-2 rounded cursor-pointer text-center"
              >
                <Link href="/cart">장바구니</Link>
              </div>
              <div
                onClick={onClick}
                className="flex-1 bg-green-500 text-white px-2 sm:px-4 py-2 rounded cursor-pointer text-center"
              >
                <Link href="/cart/pay">바로구매</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-10">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
            상품소개 이미지
          </h3>
          <div className="flex gap-2 sm:gap-4 overflow-x-auto">
            <img
              key={"title"}
              className="w-24 h-auto rounded-lg cursor-pointer"
              src={imageUrl}
              onClick={() => setShowImage(imageUrl)}
              alt={"Product Image"}
            />
            {subtitleImageUrlArray.map((url, index) => (
              <img
                key={index}
                className="w-24 h-auto rounded-lg cursor-pointer"
                onClick={() => setShowImage(url)}
                src={url}
                alt={`Subtitle Image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        {descriptionImageUrl && (
          <img
            className="w-full h-auto p-4 sm:p-10 rounded-lg mt-6 sm:mt-10"
            src={descriptionImageUrl}
            alt={"Description Image"}
          />
        )}
        <div className="mt-6 sm:mt-10">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
            리뷰
          </h3>
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
          <form onSubmit={onSubmit} className="mt-4 sm:mt-6">
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
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">
              제출
            </button>
          </form>
        </div>
      </div> */}
    </div>
  );
}
