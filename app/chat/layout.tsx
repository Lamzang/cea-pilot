"use client";

import AuthModal from "@/components/modal/authModal";
import CreateAccountModal from "@/components/modal/createAccountModal";
import LoginModal from "@/components/modal/loginModal";
import Modal from "@/components/modal/modal";
import ProfileModal from "@/components/modal/profileModal";
import { IChatUser } from "@/constant/interface";
import { auth, db } from "@/lib/firebase/firebase";
import { chatAuthState } from "@/lib/recoil/auth";
import { onAuthStateChanged } from "firebase/auth";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

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
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);
  const clickProfileModal = () => setShowProfileModal(!showProfileModal);
  const clickLoginModal = () => setShowLoginModal(!showLoginModal);
  const clickCreateAccountModal = () =>
    setShowCreateAccountModal(!showCreateAccountModal);
  const clickAuthModal = () => setShowAuthModal(!showAuthModal);

  const [user, setUser] = useRecoilState<IChatUser | null>(chatAuthState);
  const [adminUidArray, setAdminUidArray] = useState<any>(null);
  const [chatMembers, setChatMembers] = useState<any>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setUser({
          uid: newUser.uid,
          displayName: newUser.displayName,
          email: newUser.email,
        });
        console.log("user logindddddddd");
      } else {
        setUser(null);
        console.log("user logouttttttt  ");
      }
    });
  }, []);

  const fetchChatHomes = async (uid: string) => {
    let isMounted = true; // Track component mounted state
    setLoading(true); // Set loading to true before fetching data

    try {
      const querysnapshots = await getDocs(collection(db, "channels"));

      if (isMounted) {
        const homes = querysnapshots.docs
          .filter(
            (doc) =>
              doc.data().members.includes(uid) || adminUidArray.includes(uid)
          )
          .map((doc) => ({ data: doc.data(), id: doc.id }));

        setChatHomes(homes);
      }
    } catch (error) {
      console.error("Error fetching channels: ", error);
    } finally {
      if (isMounted) {
        setLoading(false); // Update loading state only if still mounted
      }
    }

    return () => {
      isMounted = false; // Clean up on unmount
    };
  };

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
    const querysnapshots = await getDocs(collection(db, "chat-members"));
    const bufferChatMembers: any[] = [];
    await querysnapshots.forEach((doc) => {
      bufferChatMembers.push(doc.data().uid);
    });
    setChatMembers(bufferChatMembers);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAdmins();
      await fetchChatMembers();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user && adminUidArray) {
      fetchChatHomes(user.uid);
    }
  }, [adminUidArray, user]);

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
          members: [user?.uid, ...adminUidArray],
        });
        await addDoc(collection(db, "channels", docRef.id, "rooms"), {
          name: "공지사항",
          role: "default",
          urlName: "announcement",
        });
        await addDoc(collection(db, "channels", docRef.id, "rooms"), {
          name: "채널 홈",
          role: "default",
          urlName: "home",
        });
        await addDoc(collection(db, "channels", docRef.id, "rooms"), {
          name: "세부 일정",
          role: "default",
          urlName: "schedule",
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
      <div className=" bg-white px-14 text-black flex justify-between items-center">
        <div className="text-lg font-bold">KCBEA 채팅방</div>
        <Link
          className="my-1 p-1 px-4 rounded-2xl text-xs border hover:bg-gray-200"
          href={"/"}
        >
          협회 홈으로가기
        </Link>
      </div>
      <div className="flex h-full w-full">
        {/* Left Sidebar */}
        <div className="bg-black text-white w-64 p-4 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5 h-5/6 w-full">
            <div className="flex justify-between items-center pr-5">
              <Link href={"/chat"} className="text-xl font-bold">
                채팅방
              </Link>
              <div
                onClick={clickModal}
                className="hover:bg-blue-600 bg-blue-500 text-white p-2 rounded-full cursor-pointer  "
              >
                채널 +
              </div>
            </div>
            {showModal && <Modal onSubmit={onSubmit} onClose={clickModal} />}

            <div className="flex flex-col flex-nowrap h-full overflow-y-auto">
              {((user && chatMembers.includes(user.uid)) ||
                adminUidArray?.includes(user?.uid)) && (
                <div className="flex flex-col">
                  {adminUidArray.includes(user?.uid) && (
                    <Link
                      href={"/chat/admin"}
                      className="p-2  mb-2 cursor-pointer"
                    >
                      관리자 페이지
                    </Link>
                  )}
                  <Link
                    href={"/chat/schedule"}
                    className="p-2  mb-2 cursor-pointer"
                  >
                    전체 일정
                  </Link>
                  <Link
                    href={"/chat/DM"}
                    className="p-2 border-b-2 mb-2 cursor-pointer"
                  >
                    DM
                  </Link>
                </div>
              )}

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
                {showAuthModal && (
                  <AuthModal
                    onClose={clickAuthModal}
                    onCreateAccount={clickCreateAccountModal}
                    onLogin={clickLoginModal}
                  />
                )}
                {showCreateAccountModal && (
                  <CreateAccountModal onClose={clickCreateAccountModal} />
                )}
                {showLoginModal && <LoginModal onClose={clickLoginModal} />}
                <div>로그인/회원가입</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Main Chat Area */}
        <div className="flex-1 bg-gray-100 flex h-full flex-col overflow-y-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
