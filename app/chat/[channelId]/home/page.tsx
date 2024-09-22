"use client";

import { db } from "@/lib/firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { channelId: string } }) {
  const [currentUsers, setCurrentUsers] = useState<any>([]);
  const [allUsers, setAllUsers] = useState<any>([]);
  const [invites, setInvites] = useState<any>([]);

  // Fetch all chat members
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
  }, [params.channelId]);

  // Fetch current channel members and categorize invitees and current users
  useEffect(() => {
    if (allUsers.length > 0) {
      getDoc(doc(db, `channels/${params.channelId}`)).then((docSnap) => {
        if (docSnap.exists()) {
          const currentMembers = docSnap.data().members || [];
          const currentUserArray = allUsers.filter((user: any) =>
            currentMembers.includes(user.uid)
          );
          const inviteUserArray = allUsers.filter(
            (user: any) => !currentMembers.includes(user.uid)
          );

          setCurrentUsers(currentUserArray);
          setInvites(inviteUserArray);
        }
      });
    }
  }, [allUsers, params.channelId]);

  // Function to handle inviting a user and log the user data
  const handleInvite = async (user: any) => {
    await updateDoc(doc(db, "channels", params.channelId), {
      members: [...currentUsers.map((user: any) => user.uid), user.uid],
    });
    await setCurrentUsers([...currentUsers, user]);
    await setInvites(invites.filter((invite: any) => invite.uid !== user.uid));
  };

  return (
    <div className="flex w-full p-4 space-x-6">
      {/* Channel Description */}
      <div className="w-2/3 p-4 bg-gray-50 shadow-md rounded-md">
        <h1 className="text-xl font-bold mb-4">채널 설명</h1>
        <p className="text-sm text-gray-700">이 채널에 대한 설명입니다.</p>
      </div>

      {/* Participants and Invitees */}
      <div className="w-1/3 space-y-8">
        {/* Participants */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-2">참여자 목록</h2>
          <ul className="space-y-2">
            {currentUsers.map((user: any) => (
              <li
                key={user.uid}
                className="p-2 bg-gray-100 rounded-md text-gray-800"
              >
                {user.displayName}
              </li>
            ))}
          </ul>
        </div>

        {/* Invitees */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-2">초대 목록</h2>
          <ul className="space-y-4">
            {invites.map((user: any) => (
              <li
                key={user.uid}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md text-gray-800"
              >
                <span>{user.displayName}</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  onClick={() => handleInvite(user)}
                >
                  초대
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
