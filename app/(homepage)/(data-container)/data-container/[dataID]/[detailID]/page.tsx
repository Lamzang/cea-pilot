"use client";

import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

import Link from "next/link";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { authState } from "@/lib/recoil/auth";

export default function Page({
  params,
}: {
  params: { dataID: string; detailID: string };
}) {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const user = useRecoilValue(authState);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const docRef = await doc(
        db,
        "reference",
        params.dataID,
        "sub",
        params.detailID
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAnnouncement(docSnap.data());
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    const fetchComments = async () => {
      const commentsRef = collection(
        db,
        "reference",
        params.dataID,
        "sub",
        params.detailID,
        "comments"
      );
      const q = query(commentsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedComments: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(fetchedComments);
    };

    fetchAnnouncement();
    fetchComments();
  }, [params.detailID]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const commentsRef = collection(
      db,
      "reference",
      params.dataID,
      "sub",
      params.detailID,
      "comments"
    );

    await addDoc(commentsRef, {
      content: newComment,
      createdAt: new Date(),
      createdBy: user?.displayName ?? "익명",
    });

    setNewComment("");
    const updatedComments = await getDocs(
      query(commentsRef, orderBy("createdAt", "desc"))
    );
    const fetchedComments: any[] = [];
    updatedComments.forEach((doc) => {
      fetchedComments.push({ id: doc.id, ...doc.data() });
    });
    setComments(fetchedComments);
  };

  if (!announcement) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold ml-1 sm:ml-8 border-b-2 pb-6 mt-6 mb-4">
        자료실- {announcement.title}
      </h1>
      <div className="p-2 sm:p-6 bg-white rounded-lg ">
        <div className="p-2 sm:p-4 rounded-md shadow-sm border">
          <textarea
            value={announcement.content}
            readOnly
            className="w-full h-40"
          />
        </div>
        <p className="text-sm text-gray-500 mt-4 text-right">
          작성일:{" "}
          {new Date(announcement.createdAt.seconds * 1000).toLocaleDateString()}
        </p>
      </div>
      {announcement.fileUrls && (
        <div>
          <div className="text-xl font-bold ml-2 sm:ml-10">파일 다운로드</div>
          <div className="w-full pt-2 ml-2 sm:ml-10 flex flex-col gap-2">
            {announcement.fileUrls?.map((data: any, index: any) => (
              <div key={index} className=" w-fit px-1">
                <Link
                  className="hover:text-red-400 flex gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data}
                >
                  <Image
                    src="/assets/svg/download.svg"
                    className="w-6 h-6"
                    alt="downloadsvg"
                    width={24}
                    height={24}
                  />
                  {announcement.fileNames[index]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full flex justify-end">
        <Link
          href={"/data-container/" + params.dataID}
          className="border w-fit mt-10 px-4 py-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-600"
        >
          목록으로 돌아가기
        </Link>
      </div>

      {/* 댓글 섹션 */}
      <div>
        <h1 className="text-2xl font-bold mt-6">댓글</h1>
        <form onSubmit={handleCommentSubmit} className="mt-4 flex">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-grow border p-2 rounded-md"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            등록
          </button>
        </form>

        <div className="mt-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b py-2">
                <div className="font-bold">{comment.createdBy}</div>
                <div className="whitespace-pre-wrap w-full  ">
                  {comment.content}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt.seconds * 1000).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
