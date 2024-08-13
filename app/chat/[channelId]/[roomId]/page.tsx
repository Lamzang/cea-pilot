"use client";

import Input from "@/components/input";
import { authState } from "@/lib/recoil/auth";
import {
  child,
  getDatabase,
  onChildAdded,
  push,
  ref,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Page({ params }: { params: { roomId: string } }) {
  const [messages, setMessages] = useState<any>([]);
  const database = getDatabase();
  const [user, setUser] = useRecoilState<any>(authState);

  useEffect(() => {
    const msgRef = ref(database, params.roomId);
    onChildAdded(msgRef, (snapshot) => {
      setMessages((prev: any) => [...prev, snapshot.val()]);
    });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = e.currentTarget.sendMsg.value;
    e.currentTarget.sendMsg.value = "";
    const newMessage = {
      sender: user.user.username,
      message: message,
      author: user.user.uid,
      timestamp: Date.now(),
    };
    const newMsgKey = push(child(ref(database), params.roomId)).key;
    const updates: { [key: string]: any } = {};
    updates["/" + params.roomId + "/" + newMsgKey] = newMessage;
    update(ref(database), updates);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-white">
        {messages.map((data: any, index: number) => (
          <div className="mb-4 p-2 bg-gray-100 rounded" key={index}>
            <div className="font-semibold">{data?.sender}</div>
            <div>{data?.message}</div>
            <div className="text-xs text-gray-500">
              {new Date(data?.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
        {/* <div ref={dummyRef} /> */}
      </div>
      <div className="h-20 flex items-center p-4 bg-gray-200">
        <form onSubmit={onSubmit} className="flex w-full items-center">
          <input name="sendMsg" className="flex-1 mr-4 w-full h-10 px-3" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
