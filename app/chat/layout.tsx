"use client";

import Input from "@/components/input";
import { database, db } from "@/lib/firebase/firebase";
import { child, get, onChildAdded, ref, update } from "firebase/database";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatHomes, setChatHomes] = useState<any>([]);
  const [channelId, setChannelId] = useState("");
  const dbRef = ref(database);

  useEffect(() => {
    const fetchData = async () => {
      const querysnapshots = await getDocs(collection(db, "channels"));
      querysnapshots.forEach((doc) => {
        setChatHomes((prev: any) => [
          ...prev,
          { data: doc.data(), id: doc.id },
        ]);
      });
    };

    fetchData();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.makeRoom.value
      .toLowerCase()
      .split(" ")
      .join("");
    e.currentTarget.makeRoom.value = "";
    const fetchData = async () => {
      const docRef = await addDoc(collection(db, "channels"), {
        description: "New Room",
        name: title,
      });
      await addDoc(collection(db, "channels", docRef.id, "rooms"), {
        name: "공지사항",
      });
    };
    fetchData();
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="bg-black text-white w-64 p-4 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5 h-5/6">
          <Link href={"/chat"} className="text-xl font-bold">
            Chat Rooms
          </Link>
          <div className="flex flex-col flex-nowrap h-full overflow-auto">
            {chatHomes.map((data: any, index: number) => (
              <Link
                href={`/chat/${data.id}`}
                key={index}
                className="p-2 mb-2 cursor-grab hover:bg-gray-700 rounded"
              >
                <div className="font-semibold">{data.data.name}</div>
                <div className="text-sm text-gray-400">
                  {data.data.description}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-4">
          <div className="mb-4">
            <Input name="makeRoom" placeholder="New Channel" />
          </div>
          <button className="bg-blue-500 w-full py-2 rounded">Create</button>
        </form>
      </div>

      {/* Right Main Chat Area */}
      <div className="flex-1 bg-gray-100 flex flex-col">{children}</div>
    </div>
  );
}
