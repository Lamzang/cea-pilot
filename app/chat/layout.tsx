"use client";

import Input from "@/components/input";
import LoginModal from "@/components/modal/loginModal";
import Modal from "@/components/modal/modal";
import ProfileModal from "@/components/modal/profileModal";
import { auth, db } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { addDoc, collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatHomes, setChatHomes] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);
  const clickProfileModal = () => setShowProfileModal(!showProfileModal);
  const clickLoginModal = () => setShowLoginModal(!showLoginModal);

  const [user, setUser] = useState<any>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      console.log("user changed", user);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querysnapshots = await getDocs(collection(db, "channels"));
        querysnapshots.forEach((doc) => {
          if (!doc.data().members.includes(user.uid)) {
            return;
          }
          setChatHomes((prev: any) => [
            ...prev,
            { data: doc.data(), id: doc.id },
          ]);
        });
      } catch (error) {
        console.error("Error fetching channels: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.makeRoom.value
      .toLowerCase()
      .split(" ")
      .join("");

    if (!title) {
      alert("Channel name cannot be empty");
      return;
    }
    setShowModal(false);

    e.currentTarget.makeRoom.value = "";
    const fetchData = async () => {
      try {
        const docRef = await addDoc(collection(db, "channels"), {
          description: "New Room",
          name: title,
          members: [user.uid],
        });
        await addDoc(collection(db, "channels", docRef.id, "rooms"), {
          name: "공지사항",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error creating channel: ", error);
      }
    };
    fetchData();
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex h-full w-full">
        {/* Left Sidebar */}
        <div className="bg-black text-white w-64 p-4 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5 h-5/6 w-full">
            <div className="flex justify-between pr-5">
              <Link href={"/chat"} className="text-xl font-bold">
                Chat Rooms
              </Link>
              <div
                onClick={clickModal}
                className="hover:bg-blue-600 bg-blue-500 text-white p-2 rounded-full cursor-pointer  "
              >
                +
              </div>
            </div>
            {showModal && <Modal onSubmit={onSubmit} onClose={clickModal} />}

            <div className="flex flex-col flex-nowrap h-full overflow-y-auto">
              {loading ? (
                <p>Loading...</p>
              ) : (
                chatHomes.map((data: any, index: number) => (
                  <Link
                    href={`/chat/${data.id}`}
                    key={index}
                    className="p-2 mb-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                  >
                    <div className="font-semibold">{data.data.name}</div>
                    <div className="text-sm text-gray-400">
                      {data.data.description}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
          <div className="h-16 w-full py-2 rounded-full flex justify-center items-center">
            {user ? (
              <div
                onClick={clickProfileModal}
                className="relative bg-gray-700 hover:bg-gray-600 text-white px-4  rounded-full cursor-pointer  text-center w-full h-full flex justify-center items-center"
              >
                {showProfileModal && (
                  <ProfileModal user={user} onClose={clickProfileModal} />
                )}
                <div>{user.displayName}</div>
              </div>
            ) : (
              <div
                className="relative bg-gray-700 hover:bg-gray-600 text-white px-4  rounded-full cursor-pointer  text-center w-full h-full flex justify-center items-center"
                onClick={clickLoginModal}
              >
                {showLoginModal && <LoginModal onClose={clickLoginModal} />}
                <div>{"로그인"}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Main Chat Area */}
        <div className="flex-1 bg-gray-100 flex h-full flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
