import Link from "next/link";

export default function ProfileBtn() {
  return (
    <div className="p-1 px-3 border-gray-500 border rounded-3xl text-white bg-customBlue-default hover:bg-customBlue-light">
      <Link href="/mypage">마이페이지</Link>
    </div>
  );
}
