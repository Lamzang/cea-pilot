"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  child,
  getDatabase,
  onChildAdded,
  onValue,
  push,
  ref,
  update,
} from "firebase/database";
import { auth } from "@/lib/firebase/firebase";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function Page({ params }: { params: { roomId: string } }) {
  const [messages, setMessages] = useState<
    {
      sender: string;
      message: string;
      fileUrl?: string;
      fileType?: string;
      timestamp: number;
    }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal
  const database = useRef(getDatabase());
  const inputRef = useRef<HTMLDivElement>(null);
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser && (!user || user.uid !== newUser.uid)) {
        setUser(newUser);
      } else if (!newUser && user) {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const msgRef = ref(database.current, `/${params.roomId}/messages`);
    const unsubscribe = onValue(msgRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      } else {
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, [params.roomId]);

  useEffect(() => {
    const msgRef = ref(database.current, `/${params.roomId}/messages`);
    const unsubscribe = onChildAdded(msgRef, (snapshot) => {
      setMessages((prev) => [...prev, snapshot.val()]);
    });
    return () => unsubscribe();
  }, [params.roomId]);

  const handleFileUpload = async (file: File) => {
    const storageReference = storageRef(
      storage,
      `uploads/${params.roomId}/${file.name}`
    );
    await uploadBytes(storageReference, file);
    return getDownloadURL(storageReference); // Return file download URL
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent
  ) => {
    e.preventDefault();
    if (!user) return;

    const message = input.trim();
    if (message === "" && !file) return;

    const newMessage: any = {
      sender: user.displayName,
      message: message || "",
      author: user.uid,
      timestamp: Date.now(),
    };

    if (file) {
      const fileUrl = await handleFileUpload(file);
      newMessage.fileUrl = fileUrl;
      newMessage.fileType = file.type;
      setFile(null);
    }

    const newMsgKey = push(child(ref(database.current), params.roomId)).key;
    const updates: { [key: string]: any } = {};
    updates[`/${params.roomId}/messages/${newMsgKey}`] = newMessage;
    update(ref(database.current), updates);

    if (inputRef.current) {
      inputRef.current.innerText = "";
    }
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit(event);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setInput(e.currentTarget.textContent || "");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null); // Reset the file when the modal is closed
  };

  const handleFileConfirm = async (file: File) => {
    setFile(file); // Store the selected file
    setIsModalOpen(false); // Close modal
    await onSubmit(
      new Event("submit") as unknown as React.FormEvent<HTMLFormElement>
    ); // Trigger form submission with file
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-white">
        {messages.map((data, index) => (
          <div className="mb-4 p-2 bg-gray-100 rounded" key={index}>
            <div className="font-semibold">{data.sender}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{data.message}</div>
            {data.fileUrl && (
              <>
                {data.fileType && data.fileType.startsWith("image/") ? (
                  <img
                    src={data.fileUrl}
                    alt="uploaded file"
                    className="mt-2 max-w-xs"
                  />
                ) : (
                  <a
                    href={data.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {data.fileUrl}
                  </a>
                )}
              </>
            )}
            <div className="text-xs text-gray-500">
              {new Date(data.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="h-20 flex items-center p-4 bg-gray-200">
        <form onSubmit={onSubmit} className="flex w-full items-center">
          {/* File upload modal trigger */}
          <button
            type="button"
            onClick={openModal}
            className="mr-4 bg-gray-300 p-2 rounded"
          >
            +
          </button>
          <div
            contentEditable
            ref={inputRef}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className="flex-1 mr-4 w-full h-10 px-3 bg-white rounded-3xl flex items-center overflow-auto"
            style={{ whiteSpace: "pre-wrap" }}
          ></div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </form>
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleFileConfirm}
      />
    </div>
  );
}

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File) => void;
}

function FileUploadModal({ isOpen, onClose, onConfirm }: FileUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleConfirm = () => {
    if (selectedFile) {
      onConfirm(selectedFile); // 선택된 파일을 부모 컴포넌트로 전달
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">파일 업로드</h2>
        <input
          type="file"
          accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" // 이미지, PDF, 엑셀 파일 허용
          onChange={handleFileChange}
          className="mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            disabled={!selectedFile} // 파일이 선택되지 않으면 버튼 비활성화
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            확인
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
