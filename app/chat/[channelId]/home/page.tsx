"use client";

import { db } from "@/lib/firebase/firebase";
import {
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
  const [channelData, setChannelData] = useState<any>({
    name: "",
    description: "",
    members: [],
  });
  const [adminUidArray, setAdminUidArray] = useState<any>([]);

  const fetchAdmins = async () => {
    await setAdminUidArray([]);

    const querysnapshots = await getDocs(collection(db, "chat-admins"));
    await querysnapshots.forEach((doc) => {
      setAdminUidArray((prev: any) => [...prev, doc.data().uid]);
    });
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

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
            (user: any) =>
              !currentMembers.includes(user.uid) &&
              !adminUidArray.includes(user.uid)
          );
          setChannelData(docSnap.data());

          setCurrentUsers(currentUserArray);

          setInvites(inviteUserArray);
        }
      });
    }
  }, [allUsers, params.channelId, adminUidArray]);

  // Function to handle inviting a user
  const handleInvite = async (user: any) => {
    await updateDoc(doc(db, "channels", params.channelId), {
      members: [...currentUsers.map((user: any) => user.uid), user.uid],
    });
    await setCurrentUsers([...currentUsers, user]);
    await setInvites(
      invites.filter(
        (invite: any) =>
          invite.uid !== user.uid && !adminUidArray.includes(user.uid)
      )
    );
  };

  // Function to handle updating channel data (name, description)
  const handleUpdateChannel = async () => {
    await updateDoc(doc(db, "channels", params.channelId), {
      name: channelData.name,
      description: channelData.description,
    });
    window.location.reload();
  };

  return (
    <div className="flex w-full p-4 space-x-6 ">
      {/* Channel Description */}
      <div className="w-2/3 p-6 bg-gray-50 shadow-md rounded-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateChannel();
          }}
        >
          <label className="block mb-2 text-lg font-semibold">채널 이름</label>
          <input
            className="w-full p-2 mb-4 border rounded-md text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={channelData.name}
            onChange={(e) =>
              setChannelData({ ...channelData, name: e.target.value })
            }
          />

          <label className="block mb-2 text-lg font-semibold">
            채널 키워드
          </label>
          <input
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={channelData.description}
            onChange={(e) =>
              setChannelData({ ...channelData, description: e.target.value })
            }
          />

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleUpdateChannel}
          >
            수정
          </button>
        </form>
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
