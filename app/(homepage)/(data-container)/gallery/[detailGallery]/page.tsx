"use client";

import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: { detailGallery: string };
}) {
  const [gallery, setGallery] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainIndex, setMainIndex] = useState(0);

  useEffect(() => {
    getDoc(doc(db, "gallery", params.detailGallery)).then((doc) => {
      setGallery(doc.data());
      setLoading(false);
    });
  }, [params.detailGallery]);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  if (!gallery) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">not found</div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold ml-1 sm:ml-8 border-b-2 pb-6 mt-6 mb-4">
        {gallery.title}
      </h1>
      <h2 className=" text-right mb-8">
        {new Date(gallery.createdAt.seconds * 1000).toLocaleDateString()}
      </h2>
      <div className="flex flex-col items-center justify-center p-4 mb-10">
        <div className="sm:w-[600px] w-full h-auto mb-10 border-b-2 pb-10">
          <Image
            src={gallery.fileUrls[mainIndex]}
            alt={gallery.name}
            width={800}
            height={800}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="flex flex-wrap w-full">
          {gallery.fileUrls.map((url: string, index: number) => (
            <div
              key={index}
              onClick={() => setMainIndex(index)}
              className="w-1/4 cursor-pointer"
            >
              <Image
                src={url}
                alt={gallery.name}
                width={200}
                height={200}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          ))}
        </div>
        <div className="w-full flex justify-end">
          <Link
            href={"/gallery"}
            className="border w-fit mt-10 px-4 py-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-600"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
