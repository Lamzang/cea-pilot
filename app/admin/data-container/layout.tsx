"use client";
import { dataContainer_array, projects_array } from "@/constant/organization";
import { db } from "@/lib/firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [projectData, setProjectData] = useState<any[]>([]);
  useEffect(() => {
    getDoc(doc(db, "data-arrays", "data-container")).then((doc) => {
      const data = doc.data();
      if (doc.exists() && data && data.data) {
        setProjectData([...data.data]);
      }
    });
  }, []);
  return (
    <div className="flex w-full min-h-screen m-0">
      <div className="flex w-full h-full">
        <div className="w-1/5 h-full border-r border-gray-300 p-4 flex flex-col mb-4">
          <Link
            href={"/admin/data-container"}
            className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2"
            onClick={() => setClickedIndex(-1)}
          >
            자료실 관리하기
          </Link>
          <Link
            href={"/admin/manageDataContainer"}
            className="font-bold cursor-pointer py-2 px-4 bg-gray-200 rounded-md mb-2"
            onClick={() => setClickedIndex(-1)}
          >
            자료실 폴더 추가/삭제
          </Link>

          <div className=" flex flex-col mb-4">
            {projectData.map((project: any, index: number) => (
              <Link
                className={`flex justify-start items-center h-12 border-b-2 px-2 hover:bg-gray-100 ${
                  clickedIndex === index
                    ? "bg-blue-400 text-white"
                    : "bg-white text-black"
                }`}
                href={`/admin/data-container/${project.link}`}
                key={index}
                onClick={() => setClickedIndex(index)}
              >
                <div className="py-1 text-gray-700 hover:underline">
                  {project.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-4/5 h-full flex-grow border-l border-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
}
