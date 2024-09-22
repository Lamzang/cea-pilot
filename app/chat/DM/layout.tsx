"use client";

import { auth, db } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [allUsers, setAllUsers] = useState<any>([]);
  const [myUser, setMyUser] = useState<any>({ uid: "" });
  const [currentDM, setCurrentDM] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser && (!myUser || myUser.uid !== newUser.uid)) {
        setMyUser(newUser); // 로그인 시 사용자 설정
      } else {
        setMyUser({ uid: "" }); // 로그아웃 시 사용자 null 설정
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 감시자 해제
  }, []);

  useEffect(() => {
    getDocs(collection(db, "chat-members")).then((querySnapshot) => {
      const users: any[] = [];
      querySnapshot.forEach((doc) => {
        users.push({
          displayName: doc.data().displayName,
          uid: doc.data().uid,
        });
      });
      setAllUsers(users);
    });
  }, []);

  const makeCompositeKey = (uid1: string, uid2: string) => {
    if (uid1 < uid2) {
      return `${uid1}-${uid2}`;
    } else {
      return `${uid2}-${uid1}`;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar for User List */}
      <div className="w-1/4 p-6 bg-gray-800 text-white flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-6">Direct Messages</h1>
        <ul className="space-y-3 overflow-y-auto flex-grow">
          {allUsers.map((user: any) => (
            <li key={user.uid}>
              <Link href={`/chat/DM/${makeCompositeKey(myUser.uid, user.uid)}`}>
                <div
                  className={`flex items-center p-4 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out ${
                    currentDM === user.uid ? "bg-gray-700" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentDM(user.uid)}
                >
                  <div className="ml-3">
                    <p className="text-md font-semibold">{user.displayName}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4  bg-white overflow-auto">{children}</div>
    </div>
  );
}
