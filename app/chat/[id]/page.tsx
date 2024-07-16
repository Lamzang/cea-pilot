"use client";
import Input from "@/components/input";
import { database } from "@/lib/firebase/firebase";
import { authState } from "@/lib/recoil/auth";
import { child, get, onChildAdded, push, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type Message = {
  sender: string;
  message: string;
  timestamp: number;
  // Add other properties if needed
};

const ChatRoom = () => {
  const [userAuth, setUserAuth] = useRecoilState(authState);
  const [messages, setMessages] = useState<Message[]>([]);
  const dbRef = ref(database);
  const deleteAll = () => {
    update(ref(database), { messages: null });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPostKey = push(child(dbRef, "messages")).key;
    console.log(userAuth.user.email);

    const postMsg = {
      sender: userAuth.user.email,
      message: e.currentTarget.sendMsg.value,
      timestamp: Date.now(),
    };
    e.currentTarget.sendMsg.value = "";
    const updates: { [key: string]: any } = {};
    updates["/messages/Chat Name One/" + newPostKey] = postMsg;
    return update(ref(database), updates);
  };
  useEffect(() => {
    onChildAdded(child(dbRef, "messages/Chat Name One"), (snapshot) => {
      if (snapshot.exists()) {
        setMessages((prev) => [...prev, snapshot.val()]);
        console.log("setMsg");
      } else {
        console.log("No data available");
      }
    });
  }, []);

  useEffect(() => {
    get(child(dbRef, "messages/Chat Name One"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMessages(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border w-1/4 h-3/4 mt-10 flex flex-col justify-center content-between">
        <div className="border h-16 flex justify-center items-center">
          Title
        </div>
        <div className="border h-full flex flex-col justify-center">
          {messages.map((data, index) => {
            return (
              <div className="border" key={index}>
                {data?.sender} : {data?.message}
              </div>
            );
          })}
        </div>
        <div className="h-14 flex justify-center items-center">
          <form
            onSubmit={onSubmit}
            className="flex justify-between w-full mx-10"
          >
            <Input name="sendMsg" />
            <button>Send</button>
          </form>
        </div>
      </div>
      <div onClick={deleteAll}>Delete All</div>
    </div>
  );
};

export default ChatRoom;
