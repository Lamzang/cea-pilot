"use client";

import { db } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import { cartState } from "@/lib/recoil/product";
import { set } from "firebase/database";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const [imageUrl, setImageUrl] = useState<any>();
  const [subtitleImageUrlArray, setSubtitleImageUrlArray] = useState<any[]>([]);
  const [descriptionImageUrl, setDescriptionImageUrl] = useState<any>();
  const storage = getStorage();
  const [amount, setAmount] = useState<number>(1);
  const [showImage, setShowImage] = useState(imageUrl);

  useEffect(() => {
    const fetchImg = async () => {
      const imageRef = ref(
        storage,
        `/images/${decodeURIComponent(params.shopId)}/title`
      ); // Assuming images are stored with their id as the filename
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
          setImageUrl(url);
          setShowImage(url);
        })
        .catch(() => "/assets/textbook.jpg"); // Fallback to a default image if not found
    };
    const fetchSubtitleImg = async () => {
      for (let i = 0; i < 5; i++) {
        try {
          const subtitleImageRef = ref(
            storage,
            `/images/${decodeURIComponent(params.shopId)}/subtitle${i}`
          );
          await getDownloadURL(subtitleImageRef).then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = (event) => {
              const blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            setSubtitleImageUrlArray((prev) => [...prev, url]);
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    const fetchDescriptionImg = async () => {
      const imageRef = ref(
        storage,
        `/images/${decodeURIComponent(params.shopId)}/description`
      ); // Assuming images are stored with their id as the filename
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
          setDescriptionImageUrl(url);
        })
        .catch(() => "/assets/textbook.jpg"); // Fallback to a default image if not found
    };
    fetchDescriptionImg();
    fetchSubtitleImg();
    fetchImg();
  }, []);

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
    <div className="py-24 flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-5/6 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="w-full md:w-1/2 h-auto p-14">
            <img
              className="w-[350px] h-[350px] rounded-lg"
              src={showImage}
              alt={"Product Image"}
            />
          </div>
          <div className="w-full md:w-1/2 p-20 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{shopData?.name}</h2>
              <div className="text-xl text-gray-800 mb-4">
                {shopData?.price}원
              </div>
              <p className="text-gray-700 mb-4 border-t-2 py-4">
                {shopData?.description}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <div>수량 :</div>
                <input
                  className="border w-20 p-2 rounded"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  type="number"
                  min="1"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div
                onClick={onClick}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                <Link className="w-full h-full" href="/cart">
                  장바구니
                </Link>
              </div>
              <div
                onClick={onClick}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                <Link className="w-full h-full" href="/cart/pay">
                  바로구매
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">상품소개 이미지</h3>
          <div className="flex gap-4">
            <img
              key={"title"}
              className="w-[100px] h-auto rounded-lg"
              src={imageUrl}
              onClick={() => setShowImage(imageUrl)}
              alt={"Product Image"}
            />
            {subtitleImageUrlArray.map((url, index) => (
              <img
                key={index}
                className="w-[100px] h-auto rounded-lg"
                onClick={() => setShowImage(url)}
                src={url}
                alt={"Product Image"}
              />
            ))}
          </div>
        </div>
        {descriptionImageUrl ? (
          <img
            className="w-full h-auto p-10 rounded-lg"
            src={descriptionImageUrl}
            alt={"Product Image"}
          />
        ) : null}
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
