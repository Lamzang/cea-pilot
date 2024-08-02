"use client";

import Input from "@/components/input";
import { database } from "@/lib/firebase/firebase";
import { child, get, onChildAdded, ref, update } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatHomes, setChatHomes] = useState<any>({});
  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, "/channelTitle")).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setChatHomes(Array.from(Object.entries(snapshot.val())));
      } else {
        console.log("No data available");
      }
    });
  }, []);

  useEffect(() => {
    console.log(chatHomes);
  }, [chatHomes]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.makeRoom.value
      .toLowerCase()
      .split(" ")
      .join("");

    const newRoom = {
      title: title,
      description: "New Room",
    };
    const updates: { [key: string]: any } = {};
    updates["/channelTitle/" + title] = newRoom;
    e.currentTarget.makeRoom.value = "";
    return update(ref(database), updates);
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="bg-gray-900 text-white w-64 p-4 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5 h-5/6">
          <Link href={"/chat"} className="text-xl font-bold ">
            Chat Rooms
          </Link>
          <div className="flex flex-col flex-nowrap h-full overflow-auto">
            {chatHomes.map((data: any, index: number) => (
              <Link
                href={`/chat/${data[0]}`}
                key={index}
                className="p-2 mb-2 cursor-grab hover:bg-gray-700 rounded"
              >
                <div className="font-semibold">{data[0]}</div>
                <div className="text-sm text-gray-400">
                  {data[1].description}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-4">
          <div className="mb-4">
            <Input name="makeRoom" placeholder="New Room" />
          </div>
          <button className="bg-blue-500 w-full py-2 rounded">Create</button>
        </form>
      </div>

      {/* Right Main Chat Area */}
      <div className="flex-1 bg-gray-100 p-4 flex flex-col">{children}</div>
    </div>
  );
}
