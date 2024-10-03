"use client";

import { IChatUser } from "@/constant/interface";
import { auth, db } from "@/lib/firebase/firebase";
import { chatAuthState } from "@/lib/recoil/auth";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [allUsers, setAllUsers] = useState<any>([]);
  const [myUser, setMyUser] = useRecoilState<IChatUser | null>(chatAuthState);
  const [currentDM, setCurrentDM] = useState<string | null>(null);
  const [adminUidArray, setAdminUidArray] = useState<any>([]);

  const fetchAdmins = async () => {
    const tempArray: any[] = [];
    try {
      const querysnapshots = await getDocs(collection(db, "chat-admins"));
      await querysnapshots.forEach((doc) => {
        tempArray.push(doc.data().uid);
      });
      await setAdminUidArray(tempArray);
    } catch (error) {
      console.error("Error fetching admins: ", error);
    }
  };

  const fetchChatMembers = async () => {
    await getDocs(collection(db, "chat-members")).then((querySnapshot) => {
      const users: any[] = [];
      querySnapshot.forEach((doc) => {
        if (adminUidArray.includes(doc.data().uid)) {
          return;
        }
        users.push({
          displayName: doc.data().displayName,
          uid: doc.data().uid,
        });
      });
      setAllUsers(users);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAdmins();
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchChatMembers();
  }, [adminUidArray]);

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
              <Link
                href={`/chat/DM/${makeCompositeKey(
                  myUser?.uid || "",
                  user.uid
                )}`}
              >
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
      <div className="w-3/4  bg-white overflow-y-auto">{children}</div>
    </div>
  );
}
