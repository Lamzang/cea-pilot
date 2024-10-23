"use client";

import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">{gallery.name}</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="sm:w-[600px] w-full h-auto">
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
      </div>
    </div>
  );
}
