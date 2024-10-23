"use client";

import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const snapshot = await getDocs(collection(db, "gallery"));
        const items: any[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setGallery(items);
      } catch (err) {
        console.error("Error fetching gallery data: ", err);
        setError("Failed to load gallery items.");
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>; // 로딩 중인 경우
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>; // 에러 발생 시
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold ml-1 sm:ml-8 border-b-2 pb-6 mt-6 mb-4">
        갤러리
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 px-10">
        {gallery.map((item: any) => (
          <Link
            href={`/gallery/${item.id}`} // 경로 수정
            key={item.id} // id를 key로 사용
            className="group relative block overflow-hidden rounded-lg shadow-lg"
          >
            <Image
              src={item.fileUrls[0]} // 이미지 경로 수정
              alt={item.title}
              width={300}
              height={300}
              className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
            />
            {/* 오버레이 추가 */}
            <div className="flex flex-col gap-2 p-2 px-4 pb-3">
              <div className="text-lg font-semibold">{item.title}</div>
              <div className="text-sm flex w-full justify-end">
                {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
