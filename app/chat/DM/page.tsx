"use client";

import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [allUsers, setAllUsers] = useState<any>([]);
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
  return (
    <div>
      <h1>Direct Messages</h1>
      <ul>
        {allUsers.map((user: any) => (
          <Link href={`/chat/DM/${user.uid}`} key={user.uid}>
            {user.displayName}
          </Link>
        ))}
      </ul>
    </div>
  );
}
