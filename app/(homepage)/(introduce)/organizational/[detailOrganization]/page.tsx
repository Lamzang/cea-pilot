"use client";

import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Page({
  params,
}: {
  params: {
    detailOrganization:
      | "president"
      | "vice-president"
      | "director"
      | "training-team"
      | "RD-team"
      | "curriculum-team"
      | "partnership-support-team"
      | "operation-team";
  };
}) {
  /* const EngToKor: {
    [key in
      | "president"
      | "vice-president"
      | "director"
      | "training-team"
      | "RD-team"
      | "curriculum-team"
      | "partnership-support-team"
      | "operation-team"]: string;
  } = {
    president: "회장",
    "vice-president": "부회장",
    director: "이사",
    "training-team": "연수팀",
    "RD-team": "연구개발팀",
    "curriculum-team": "교육과정팀",
    "partnership-support-team": "협력지원팀",
    "operation-team": "운영팀",
  };
  const organizationDB = getDoc(
    doc(db, "organization", EngToKor[params.detailOrganization])
  ); */
  console.log(params);
  return <div></div>;
}
