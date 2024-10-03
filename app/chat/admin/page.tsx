"use client";

import { IChatUser } from "@/constant/interface";
import { auth, db } from "@/lib/firebase/firebase";
import { chatAuthState } from "@/lib/recoil/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Page() {
  const [user, setUser] = useRecoilState<IChatUser | null>(chatAuthState);
  const [members, setMembers] = useState<any>([]);
  const [standbyUsers, setStandbyUsers] = useState<any>([]);
  const [adminUidArray, setAdminUidArray] = useState<any>([]);

  useEffect(() => {
    const fetchStandbyData = async () => {
      const querysnapshots = await getDocs(collection(db, "chat-standby"));
      querysnapshots.forEach((doc) => {
        setStandbyUsers((prev: any) => [
          ...prev,
          { id: doc.id, ...doc.data() },
        ]);
      });
    };

    const fetchMemberData = async () => {
      const querysnapshots = await getDocs(collection(db, "chat-members"));
      querysnapshots.forEach((doc) => {
        setMembers((prev: any) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    };

    const fetchAdminData = async () => {
      const querysnapshots = await getDocs(collection(db, "chat-admins"));
      querysnapshots.forEach((doc) => {
        setAdminUidArray((prev: any) => [...prev, doc.data().uid]);
      });
    };

    fetchMemberData();
    fetchStandbyData();
    fetchAdminData();
  }, []);

  const formatTimestamp = (timestamp: any) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return "Invalid timestamp";
  };

  const userDelete = async (collectionName: string, userId: string) => {
    try {
      await deleteDoc(doc(db, collectionName, userId));
      if (collectionName === "chat-standby") {
        setStandbyUsers(standbyUsers.filter((user: any) => user.id !== userId));
      } else if (collectionName === "chat-members") {
        setMembers(members.filter((member: any) => member.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const userApprove = async (standbyUser: any) => {
    try {
      // Add the user to the members collection
      await setDoc(doc(db, "chat-members", standbyUser.id), {
        displayName: standbyUser.displayName,
        email: standbyUser.email,
        time: standbyUser.time,
        uid: standbyUser.uid,
      });

      // Remove the user from the standby collection
      await deleteDoc(doc(db, "chat-standby", standbyUser.id));
      setStandbyUsers(
        standbyUsers.filter((user: any) => user.id !== standbyUser.id)
      );
      setMembers((prev: any) => [...prev, standbyUser]);
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  return (
    <div className="p-8 h-full bg-gray-50 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin</h1>
      {user && adminUidArray.includes(user.uid) && (
        <div className="h-full space-y-10">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Members
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {members.map((member: any) => (
                <div
                  key={member.uid}
                  className="p-6 bg-white shadow-lg rounded-xl flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-medium text-gray-900">
                      {member.displayName}
                    </p>
                  </div>
                  <button
                    onClick={() => userDelete("chat-members", member.id)}
                    className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Standby Users
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {standbyUsers.map((standbyUser: any) => (
                <div
                  key={standbyUser.uid}
                  className="p-6 bg-white shadow-lg rounded-xl"
                >
                  <div className="mb-4">
                    <p className="text-lg font-medium text-gray-900">
                      {standbyUser.displayName}
                    </p>
                    <p className="text-sm text-gray-500">{standbyUser.email}</p>
                    <p className="text-sm text-gray-500">
                      {standbyUser.time
                        ? formatTimestamp(standbyUser.time)
                        : "No time available"}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => userApprove(standbyUser)}
                      className="px-4 py-2 text-sm font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => userDelete("chat-standby", standbyUser.id)}
                      className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      거절
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
