"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  child,
  getDatabase,
  onChildAdded,
  onValue,
  push,
  ref,
  update,
} from "firebase/database";
import { auth } from "@/lib/firebase/firebase";
import { useRecoilState } from "recoil";
import { IChatUser } from "@/constant/interface";
import { chatAuthState } from "@/lib/recoil/auth";

export default function Page({ params }: { params: { channelId: string } }) {
  const [messages, setMessages] = useState<
    { sender: string; message: string; timestamp: number }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const [user, setUser] = useRecoilState<IChatUser | null>(chatAuthState);
  const database = useRef(getDatabase()); // ref를 통해 초기화하여 재렌더링 방지
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const msgRef = ref(database.current, `/${params.channelId}/messages`);
    const unsubscribe = onValue(msgRef, (snapshot) => {
      console.log("snapshot", snapshot.val());
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      } else {
        setMessages([]); // 메시지가 없는 경우 빈 배열로 초기화
      }
    });
    return () => unsubscribe();
  }, [params.channelId]);

  useEffect(() => {
    const msgRef = ref(database.current, `/${params.channelId}/messages`);
    const unsubscribe = onChildAdded(msgRef, (snapshot) => {
      setMessages((prev) => [...prev, snapshot.val()]);
    });
    return () => unsubscribe(); // cleanup 추가
  }, [params.channelId]);

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent
  ) => {
    e.preventDefault();
    if (!user) return; // 유저가 없을 경우 리턴

    const message = input.trim();
    if (message === "") return;

    const newMessage = {
      sender: user.displayName,
      message: message,
      author: user.uid,
      timestamp: Date.now(),
    };

    const newMsgKey = push(child(ref(database.current), params.channelId)).key;
    const updates: { [key: string]: any } = {};
    updates[`/${params.channelId}/messages/${newMsgKey}`] = newMessage;
    update(ref(database.current), updates);

    if (inputRef.current) {
      inputRef.current.innerText = "";
    }
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit(event);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setInput(e.currentTarget.textContent || "");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-white">
        {messages.map((data, index) => (
          <div className="mb-4 p-2 bg-gray-100 rounded" key={index}>
            <div className="font-semibold">{data.sender}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{data.message}</div>
            <div className="text-xs text-gray-500">
              {new Date(data.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="h-20 flex items-center p-4 bg-gray-200">
        <form onSubmit={onSubmit} className="flex w-full items-center">
          <div
            contentEditable
            ref={inputRef}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className="flex-1 mr-4 w-full h-10 px-3 py-2 bg-white rounded-3xl flex items-center overflow-auto"
            style={{ whiteSpace: "pre-wrap" }}
          ></div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
