"use client";

import Input from "@/components/input";
import { database } from "@/lib/firebase/firebase";
import { child, get, onChildAdded, ref, update } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react";

type Message = {
  title: string;
  lastMsg: string;
  timestamp: number;
};

export default function ChatHome() {
  const [chatHomes, setChatHomes] = useState<Message[]>([]);
  const dbRef = ref(database);
  useEffect(() => {
    onChildAdded(child(dbRef, "chats"), (snapshot) => {
      if (snapshot.exists()) {
        setChatHomes((prev) => [...prev, snapshot.val()]);
      } else {
        console.log("No data available");
      }
    });
  }, []);
  useEffect(() => {
    get(child(dbRef, "chats"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setChatHomes(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.makeRoom.value
      .toLowerCase()
      .split(" ")
      .join("");

    const newRoom = {
      title: title,
      lastMsg: "",
      timestamp: Date.now(),
    };
    const updates: { [key: string]: any } = {};
    updates["/chats/" + title] = newRoom;
    e.currentTarget.makeRoom.value = "";
    return update(ref(database), updates);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border w-1/4 h-3/4 mt-10 flex flex-col justify-center content-between">
        <div className="border h-16 flex justify-center items-center">
          Title
        </div>
        <div className="border h-full flex flex-col justify-center">
          {chatHomes.map((data, index) => {
            return (
              <div
                className="border"
                key={index}
                onClick={() =>
                  window.open(
                    `/chat/${data?.title}`,
                    "newwindow",
                    "width=320, height=500"
                  )
                }
              >
                {data?.title} : {data?.lastMsg}
              </div>
            );
          })}
        </div>
        <form
          onSubmit={onSubmit}
          className="h-14 flex items-center justify-between w-full px-10"
        >
          <Input name="makeRoom" />
          <button>Make</button>
        </form>
      </div>
    </div>
  );
}
