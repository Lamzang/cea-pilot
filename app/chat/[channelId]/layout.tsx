"use client";
import Input from "@/components/input";
import { db } from "@/lib/firebase/firebase";

import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Layout = ({
  params,
  children,
}: {
  params: { channelId: string };
  children: React.ReactNode;
}) => {
  const [channelName, setChannelName] = useState<any>();
  const [rooms, setRooms] = useState<any>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const querysnapshots = await getDocs(
        collection(db, `channels/${params.channelId}/rooms`)
      );
      querysnapshots.forEach((doc) => {
        setRooms((prev: any) => [...prev, { data: doc.data(), id: doc.id }]);
      });
    };
    const fetchChannelName = async () => {
      const querysnapshots = await getDoc(
        doc(db, `/channels/${params.channelId}`)
      );
      setChannelName(querysnapshots.data());
    };
    fetchChannelName();
    fetchRooms();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.makeRoom.value
      .toLowerCase()
      .split(" ")
      .join("");
    e.currentTarget.makeRoom.value = "";
    const docRef = await addDoc(
      collection(db, `channels/${params.channelId}/rooms`),
      {
        name: title,
      }
    );
    setRooms((prev: any) => [
      ...prev,
      { data: { name: title }, id: docRef.id },
    ]);
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="h-full bg-gray-800 w-1/4 p-4 flex flex-col justify-between">
        <div>
          <div className="w-full text-white flex font-bold text-xl mb-4">
            {channelName?.name}
          </div>
          <div className="w-full h-full flex flex-col overflow-y-auto">
            {rooms.map((data: any, index: number) => (
              <Link
                href={`/chat/${params.channelId}/${data.id}`}
                className="border-b border-gray-700 p-2 text-white"
                key={index}
              >
                <div className="font-semibold">{data.data.name}</div>
              </Link>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-4">
          <div className="mb-4 text-white">
            <Input name="makeRoom" placeholder="New Room" />
          </div>
          <button className="bg-blue-500 w-full py-2 rounded">Create</button>
        </form>
      </div>
      <div className="w-full h-full">
        {/* <div className="border-b h-16 flex items-center justify-center text-xl font-semibold bg-gray-200">
          Title
        </div> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
