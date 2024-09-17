"use client";

import { auth } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
  child,
  getDatabase,
  onChildAdded,
  push,
  ref,
  update,
} from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

export default function Page({ params }: { params: { roomId: string } }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const database = getDatabase();
  const [user, setUser] = useState<any>();
  const inputRef = useRef<HTMLDivElement>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      console.log("user changed", user);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    const msgRef = ref(database, `/${params.roomId}/messages`);
    onChildAdded(msgRef, (snapshot) => {
      setMessages((prev) => [...prev, snapshot.val()]);
    });
  }, [database, params.roomId]);

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent
  ) => {
    e.preventDefault();
    const message = input.trim();
    if (message === "") return; // Avoid sending empty messages

    const newMessage = {
      sender: user.displayName,
      message: message,
      author: user.uid,
      timestamp: Date.now(),
    };
    const newMsgKey = push(child(ref(database), params.roomId)).key;
    const updates: { [key: string]: any } = {};
    updates[`/${params.roomId}/messages/${newMsgKey}`] = newMessage;
    update(ref(database), updates);

    // Clear the contentEditable div and input state
    if (inputRef.current) {
      inputRef.current.innerText = "";
    }
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit(event); // Trigger message send on Enter without shift
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
            <div className="font-semibold">{data?.sender}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{data?.message}</div>
            <div className="text-xs text-gray-500">
              {new Date(data?.timestamp).toLocaleString()}
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
            className="flex-1 mr-4 w-full h-10 px-3 bg-white rounded-3xl flex items-center overflow-auto"
            style={{ whiteSpace: "pre-wrap" }} // Allow multiline input
          ></div>

          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
