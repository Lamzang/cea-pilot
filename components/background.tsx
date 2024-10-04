"use client";

import { useEffect, useState } from "react";

export default function BackgroundImage() {
  const [isFading, setIsFading] = useState(false);
  const mainImages: string[] = [
    "/assets/mainTitle/background3.jpg",
    "/assets/mainTitle/background2.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === mainImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsFading(false);
      }, 7000); // Duration of the fade out
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentImageIndex, mainImages.length]);
  return (
    <>
      <div
        className={`absolute w-full left-0 h-[300px] sm:h-[500px] flex justify-center items-center`}
        style={{
          zIndex: -1000,
          backgroundImage: `url("/assets/mainTitle/background3.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-20"></div>
      </div>
      <div
        className={`absolute w-full left-0 h-[300px] sm:h-[500px] flex justify-center items-center image-container
          transition-opacity duration-500 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        style={{
          zIndex: -50,
          backgroundImage: `url("/assets/mainTitle/background2.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-20"></div>
      </div>
    </>
  );
}
