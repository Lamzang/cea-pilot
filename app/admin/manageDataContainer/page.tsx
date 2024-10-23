"use client";

import { db } from "@/lib/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Page() {
  const [projectData, setProjectData] = useState<any[]>([]);
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newProjectLink, setNewProjectLink] = useState<string>("");

  // Fetch existing projects from Firestore
  useEffect(() => {
    getDoc(doc(db, "data-arrays", "data-container")).then((doc) => {
      const data = doc.data();
      if (doc.exists() && data && data.data) {
        setProjectData([...data.data]);
      }
    });
  }, []);

  // Function to handle adding a new project
  const handleAddProject = async () => {
    const newProject = { name: newProjectName, link: newProjectLink };
    const updatedProjects = [...projectData, newProject];

    // Update local state
    setProjectData(updatedProjects);
    // Clear input fields
    setNewProjectName("");
    setNewProjectLink("");
  };

  // Function to handle deleting a project
  const handleDeleteProject = async (index: number) => {
    const updatedProjects = projectData.filter((_, i) => i !== index);

    // Update local state
    setProjectData(updatedProjects);

    // Optionally: Update Firestore here
  };

  // Function to handle project input changes
  const handleProjectChange = (index: number, key: string, value: string) => {
    const updatedProjects = projectData.map((project, i) =>
      i === index ? { ...project, [key]: value } : project
    );

    // Update local state
    setProjectData(updatedProjects);
  };

  const uploadToFirestore = async () => {
    try {
      await updateDoc(doc(db, "data-arrays", "data-container"), {
        data: projectData,
      });
      alert("변경사항이 저장되었습니다.");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("변경사항 저장에 실패했습니다.");
    }
  };

  return (
    <div>
      <div className="flex justify-between mx-1 sm:mx-10 border-b-2 pb-6 mt-6 mb-4">
        <h1 className="text-3xl font-bold">자료실 폴더 추가/삭제</h1>
        <div
          className="text-white bg-blue-500 rounded-3xl px-4 flex items-center cursor-pointer"
          onClick={uploadToFirestore}
        >
          변경사항 저장하기
        </div>
      </div>

      {projectData.map((project: any, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between border-b-2 py-2 px-10 mx-20 my-1"
        >
          <input
            className="w-1/3 border px-2 py-1"
            value={project.name}
            onChange={(e) => handleProjectChange(index, "name", e.target.value)}
          />
          <input
            className="w-1/3 border px-2 py-1"
            value={project.link}
            onChange={(e) => handleProjectChange(index, "link", e.target.value)}
          />
          <button
            className="bg-red-500 text-white rounded-md px-2 py-1"
            onClick={() => handleDeleteProject(index)}
          >
            삭제
          </button>
        </div>
      ))}

      <div className="flex items-center mt-4 pb-6 justify-between border-b-2 py-2 px-10 mx-20">
        <input
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="이름"
          className="w-1/3 border px-2 py-1 "
        />
        <input
          value={newProjectLink}
          onChange={(e) => setNewProjectLink(e.target.value)}
          placeholder="링크"
          className="w-1/3 border px-2 py-1 "
        />
        <button
          onClick={handleAddProject}
          className="bg-green-500 text-white rounded-md px-2 py-1"
        >
          추가
        </button>
      </div>
      <div className="text-red-500 mx-20 mt-4">
        * 주의사항: 링크는 영어와 - 기호만을 사용할 것을 권장합니다.
      </div>
    </div>
  );
}
