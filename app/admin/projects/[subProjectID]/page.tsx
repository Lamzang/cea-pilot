"use client";

import { projects_array } from "@/constant/organization";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { subProjectID: string } }) {
  const [projectName, setProjectName] = useState<string>("");
  useEffect(() => {
    projects_array.map((project: any, index: number) => {
      if (project.link === params.subProjectID) {
        setProjectName(project.name);
      }
    });
  }, []);
  return (
    <div className="px-10 py-4 flex justify-between border-b-2 items-center">
      <div>{projectName} 프로젝트 관리</div>
      <Link
        href={`/admin/projects/${params.subProjectID}/editor`}
        className="p-2 my-2 border px-4 w-fit rounded-3xl bg-blue-500 text-white"
      >
        {projectName} 자료 추가하기
      </Link>
    </div>
  );
}