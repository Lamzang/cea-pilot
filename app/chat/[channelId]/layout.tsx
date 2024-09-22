"use client";
import Input from "@/components/input";
import InviteModal from "@/components/modal/inviteModal";
import Modal from "@/components/modal/modal";
import { db } from "@/lib/firebase/firebase";
import { channel } from "diagnostics_channel";
import { getDatabase, ref, set } from "firebase/database";

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
  const [channelData, setChanelData] = useState<IChannel>();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [defaultRooms, setDefaultRooms] = useState<IRoom[]>([]);
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);
  const [currentRoom, setCurrentRoom] = useState<any>();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const clickInviteModal = () => setShowInviteModal(!showInviteModal);
  const [chatMembers, setChatMembers] = useState<IMember[]>([]);
  const [inviteMembers, setInviteMembers] = useState<IMember[]>([]);

  interface IRoom {
    data: any;
    id: string;
  }
  interface IMember {
    uid: string;
    name: string;
  }
  interface IChannel {
    name: string;
    members: string[];
  }

  useEffect(() => {
    const fetchRooms = async () => {
      const querysnapshots = await getDocs(
        collection(db, `channels/${params.channelId}/rooms`)
      );
      const bufferDefaultRooms: IRoom[] = [];
      const bufferRooms: IRoom[] = [];
      await querysnapshots.forEach((doc) => {
        if (doc.data().role === "default") {
          bufferDefaultRooms.push({ data: doc.data(), id: doc.id });
        } else {
          bufferRooms.push({ data: doc.data(), id: doc.id });
        }
      });
      await setDefaultRooms(bufferDefaultRooms);
      await setRooms(bufferRooms);
    };
    const fetchChannelName = async () => {
      await getDoc(doc(db, `/channels/${params.channelId}`))
        .then((doc) => {
          const data = doc.data();
          if (data) {
            setChanelData({ name: data.name, members: data.members });
          }
        })
        .catch((err) => console.log(err));
    };
    const fetchUsers = async () => {
      const querysnapshots = await getDocs(collection(db, `chat-members`));
      const bufferChatMembers: IMember[] = [];
      await querysnapshots.forEach((doc) => {
        bufferChatMembers.push({
          uid: doc.data().uid,
          name: doc.data().displayName,
        });
      });
      await setChatMembers(bufferChatMembers);
    };
    fetchChannelName();
    fetchRooms();
    fetchUsers();
  }, []);

  useEffect(() => {
    setInviteMembers(
      chatMembers.filter(
        (member: any) => !channelData?.members.includes(member.uid)
      )
    );
  }, [channelData, chatMembers]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const database = getDatabase();
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
    await setRooms((prev: any) => [
      ...prev,
      { data: { name: title }, id: docRef.id },
    ]);
    await set(ref(database, `/${docRef.id}/messages`), {});
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100 ">
      <div className="h-full bg-gray-800 overflow-y-auto w-1/4 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between w-full ">
            <div className="w-1/2 text-white flex font-bold text-xl  p-2 py-1">
              {channelData?.name}
            </div>

            <div
              onClick={clickModal}
              className="rounded-full border-white border-2 hover:bg-slate-500 cursor-grab text-white p-2"
            >
              채팅방 +
            </div>
          </div>
          <div className="border-b-2 w-full flex flex-col">
            <Link
              href={`/chat/${params.channelId}/home`}
              className="p-2 px-4 my-3 rounded-full text-white"
              style={{
                backgroundColor: currentRoom === "home" ? "#4b5563" : "",
              }}
              onClick={() => setCurrentRoom("home")}
            >
              <div className="font-semibold">{"채널 홈"}</div>
            </Link>
            <Link
              href={`/chat/${params.channelId}/announcement`}
              className="p-2 px-4 my-3 rounded-full text-white"
              style={{
                backgroundColor:
                  currentRoom === "announcement" ? "#4b5563" : "",
              }}
              onClick={() => setCurrentRoom("announcement")}
            >
              <div className="font-semibold">{"공지사항"}</div>
            </Link>
            <Link
              href={`/chat/${params.channelId}/schedule`}
              className="p-2 px-4 my-3 rounded-full text-white"
              style={{
                backgroundColor: currentRoom === "schedule" ? "#4b5563" : "",
              }}
              onClick={() => setCurrentRoom("schedule")}
            >
              <div className="font-semibold">{"세부일정"}</div>
            </Link>
          </div>

          <div className="w-full flex flex-col overflow-y-auto">
            {rooms.map((data: any, index: number) => (
              <Link
                href={`/chat/${params.channelId}/${data.id}`}
                className=" p-2 px-4 my-3 rounded-full text-white"
                style={{
                  backgroundColor: currentRoom === data.id ? "#4b5563" : "",
                }}
                key={index}
                onClick={() => setCurrentRoom(data.id)}
              >
                <div className="font-semibold">{data.data.name}</div>
              </Link>
            ))}
          </div>
        </div>
        {showModal && <Modal onSubmit={onSubmit} onClose={clickModal} />}
        {showInviteModal && (
          <InviteModal
            onClose={clickInviteModal}
            members={inviteMembers}
            onSubmit={() => {}}
          />
        )}
      </div>
      <div className="w-full h-full overflow-y-auto">
        {/* <div className="border-b h-16 flex items-center justify-center text-xl font-semibold bg-gray-200">
          Title
        </div> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
