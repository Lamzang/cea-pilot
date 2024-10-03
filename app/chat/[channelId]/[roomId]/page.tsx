"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  child,
  getDatabase,
  onChildAdded,
  onChildChanged,
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
import { useRecoilState } from "recoil";
import { IChatUser } from "@/constant/interface";
import { chatAuthState } from "@/lib/recoil/auth";

export default function Page({ params }: { params: { roomId: string } }) {
  const [messages, setMessages] = useState<
    {
      sender: string;
      message: string;
      fileUrl?: string;
      fileType?: string;
      timestamp: number;
      isUploading?: boolean; // 임시로 업로드 중인 메시지인지 표시
    }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const [user, setUser] = useRecoilState<IChatUser | null>(chatAuthState);
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const [isUploading, setIsUploading] = useState<boolean>(false); // File upload loading state
  const database = useRef(getDatabase());
  const inputRef = useRef<HTMLDivElement>(null);
  const storage = getStorage();

  // Authentication state listener

  // New message listener
  useEffect(() => {
    const msgRef = ref(database.current, `/${params.roomId}/messages`);

    // 메시지 추가 시 실행
    const unsubscribeAdded = onChildAdded(msgRef, (snapshot) => {
      setMessages((prev) => [...prev, snapshot.val()]);
    });

    // 메시지가 변경될 때 실행 (예: 이미지 URL 추가)
    const unsubscribeChanged = onChildChanged(msgRef, (snapshot) => {
      const updatedMessage = snapshot.val();
      setMessages((prev) =>
        prev.map((msg) =>
          msg.timestamp === updatedMessage.timestamp ? updatedMessage : msg
        )
      );
    });

    return () => {
      unsubscribeAdded();
      unsubscribeChanged();
    };
  }, [params.roomId]);

  // File upload handler
  const handleFileUpload = async (file: File, messageKey: string) => {
    const storageReference = storageRef(
      storage,
      `uploads/${params.roomId}/${file.name}`
    );
    const snapshot = await uploadBytes(storageReference, file);
    const fileUrl = await getDownloadURL(snapshot.ref);

    const updates: { [key: string]: any } = {};
    updates[`/${params.roomId}/messages/${messageKey}/fileUrl`] = fileUrl;
    updates[`/${params.roomId}/messages/${messageKey}/fileType`] = file.type;
    updates[`/${params.roomId}/messages/${messageKey}/isUploading`] = false; // 업로드 완료 표시

    update(ref(database.current), updates); // Update message with file URL

    setFile(null);
  };

  // Message submit handler
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
      isUploading: !!file, // 파일 업로드 중 표시
    };

    const newMsgKey = push(child(ref(database.current), params.roomId)).key;
    const updates: { [key: string]: any } = {};
    updates[`/${params.roomId}/messages/${newMsgKey}`] = newMessage;

    // Update message immediately with text only (and indicate that it is uploading if file exists)
    update(ref(database.current), updates);

    // If there is a file, upload it asynchronously
    if (file) {
      if (newMsgKey) {
        handleFileUpload(file, newMsgKey); // 파일 업로드
      }
    }

    if (inputRef.current) {
      inputRef.current.innerText = "";
    }
    setInput("");
    setFile(null); // 파일 초기화
  };

  const fileSubmit = async () => {
    if (!user) return;

    const message = input.trim();
    if (!file) return;

    const newMessage: any = {
      sender: user.displayName,
      message: message || "",
      author: user.uid,
      timestamp: Date.now(),
      isUploading: !!file, // 파일 업로드 중 표시
    };
    console.log(newMessage);

    const newMsgKey = push(child(ref(database.current), params.roomId)).key;
    const updates: { [key: string]: any } = {};
    updates[`/${params.roomId}/messages/${newMsgKey}`] = newMessage;

    // Update message immediately with text only (and indicate that it is uploading if file exists)
    update(ref(database.current), updates);

    // If there is a file, upload it asynchronously
    if (file) {
      if (newMsgKey) {
        handleFileUpload(file, newMsgKey); // 파일 업로드
      }
    }

    if (inputRef.current) {
      inputRef.current.innerText = "";
    }
    setInput("");
    // 파일 초기화
    setFile(null);
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
    if (file) {
      setIsUploading(true); // 파일 업로드 상태 표시
    }
  };

  const handleFileConfirm = async (file: File) => {
    await setFile(file); // Store the selected file

    await setIsModalOpen(false); // Close modal
  };

  useEffect(() => {
    if (file) {
      fileSubmit();
    }
  }, [file]);

  const messageListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageListRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={messageListRef}
        className="flex-1 flex flex-col overflow-y-auto p-4 bg-white"
      >
        {messages.map((data, index) => (
          <div className="mb-4 p-2 bg-gray-100 rounded" key={index}>
            <div className="font-semibold">{data.sender}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{data.message}</div>
            {data.fileUrl && !data.isUploading && (
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
            {/* 업로드 중일 때 상태 표시 */}
            {data.isUploading && (
              <div className="text-xs text-gray-500">Uploading image...</div>
            )}
            <div className="text-xs text-gray-500">
              {new Date(data.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* File ready state indicator */}
      {isUploading && (
        <div className="file-ready-indicator">File ready for upload!</div>
      )}

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
            className="flex-1 mr-4 w-full h-10 px-3 py-2 bg-white rounded-3xl flex items-center overflow-auto"
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
      onConfirm(selectedFile); // Pass the selected file to the parent component
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">파일 업로드</h2>
        <input
          type="file"
          accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" // Allow image, PDF, Excel files
          onChange={handleFileChange}
          className="mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            disabled={!selectedFile} // Disable button if no file is selected
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
