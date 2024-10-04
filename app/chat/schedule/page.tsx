"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export default function Page() {
  interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    backgroundColor: string;
    textColor: string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({ start: "", end: "" });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const bufferEvents: Event[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const event: Event = {
        id: doc.id,
        title: data.title,
        start: data.start,
        end: data.end,
        backgroundColor: data.backgroundColor,
        textColor: data.textColor,
      };
      bufferEvents.push(event);
    });
    setEvents(bufferEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 날짜 선택 시 모달을 열기 위한 핸들러
  const handleSelect = (selectInfo: any) => {
    setSelectedRange({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setSelectedEvent(null); // 새로운 이벤트 생성
    setIsModalOpen(true); // 모달창 열기
  };

  // 기존 이벤트 클릭 시 수정 모달을 열기 위한 핸들러
  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    setSelectedEvent(event); // 클릭한 이벤트 저장
    setSelectedRange({
      start: event.startStr,
      end: event.endStr || event.startStr,
    });
    setIsModalOpen(true); // 모달창 열기
  };

  // 새로운 이벤트 추가 또는 기존 이벤트 수정
  const handleSaveEvent = async (title: string, color: string) => {
    if (selectedEvent) {
      // 기존 이벤트 수정
      const updatedEvents = events.map((evt) =>
        evt.id === selectedEvent.id
          ? { ...evt, title, backgroundColor: color, textColor: "#fff" }
          : evt
      );
      setEvents(updatedEvents);

      // Firestore에서 업데이트
      await updateDoc(doc(db, "events", selectedEvent.id), {
        title,
        backgroundColor: color,
        textColor: "#fff",
        start: selectedRange.start,
        end: selectedRange.end,
      });

      // FullCalendar 이벤트 업데이트 (자동으로 반영될 수 있음)
    } else {
      // 새로운 이벤트 추가
      const newEvent = {
        title,
        start: selectedRange.start,
        end: selectedRange.end,
        backgroundColor: color,
        textColor: "#fff", // 흰색 글자색
      };

      // Firestore에 새 이벤트 추가
      const docRef = await addDoc(collection(db, "events"), newEvent);

      // Firestore에서 생성된 ID를 이벤트에 반영
      const addedEvent = { ...newEvent, id: docRef.id };
      setEvents([...events, addedEvent]);
    }
    setIsModalOpen(false); // 모달창 닫기
  };

  // 이벤트 삭제 핸들러
  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      const filteredEvents = events.filter(
        (evt) => evt.id !== selectedEvent.id
      );
      setEvents(filteredEvents); // 이벤트 리스트에서 삭제

      // Firestore에서 이벤트 삭제
      await deleteDoc(doc(db, "events", selectedEvent.id));

      selectedEvent.remove(); // FullCalendar에서 해당 이벤트 제거
      setIsModalOpen(false); // 모달창 닫기
    }
  };

  return (
    <div className="p-10 h-full overflow-y-auto">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        selectable={true}
        select={handleSelect} // 날짜 선택 시 호출
        eventClick={handleEventClick} // 기존 이벤트 클릭 시 호출
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        nowIndicator={false}
        editable={true}
        selectMirror={true}
      />
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent} // 삭제 함수 전달
          selectedRange={selectedRange}
          initialTitle={selectedEvent ? selectedEvent.title : ""}
          initialColor={
            selectedEvent ? selectedEvent.backgroundColor : "#3788d8"
          }
        />
      )}
    </div>
  );
}

// 모달 컴포넌트
function Modal({
  onClose,
  onSave,
  onDelete,
  selectedRange,
  initialTitle,
  initialColor,
}: any) {
  const [title, setTitle] = useState(initialTitle || ""); // 초기 제목 설정
  const [color, setColor] = useState(initialColor || "#3788d8"); // 초기 색상 설정

  const handleSave = () => {
    if (title) {
      onSave(title, color);
    }
  };
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // toLocaleString을 사용하여 날짜와 시간만 출력
    const formattedStart = startDate.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedEnd = endDate.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedStart} ~ ${formattedEnd}`;
  };

  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-customModalBg-default flex justify-center items-center z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
      >
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl mb-4">
            {initialTitle ? "일정 수정" : "새 일정 추가"}
          </h2>
          <p>
            선택한 날짜 범위:{" "}
            {formatDateRange(selectedRange.start, selectedRange.end)}
          </p>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            placeholder="일정 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="block mb-4">
            색상 선택:
            <input
              type="color"
              className="ml-2"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <div className="flex justify-between ">
            {initialTitle && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={onDelete}
              >
                삭제
              </button>
            )}
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleSave}
              >
                저장
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={onClose}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
