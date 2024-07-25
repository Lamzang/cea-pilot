import Link from "next/link";

export default function AdminUsers() {
  const USERID = "1234";
  return (
    <div>
      <div>User Data</div>
      <div>order Method</div>
      <div>
        <div className="flex gap-10 py-2">
          <div>user name</div>
          <div>user phone number</div>
          <div>user email</div>
          <div>user address</div>
          <div>user credentials</div>
          <Link href={`/admin/${USERID}`} className="bg-black text-white">
            detail User
          </Link>
        </div>
        <div className="flex gap-10 py-2">
          <div>user name</div>
          <div>user phone number</div>
          <div>user email</div>
          <div>user address</div>
          <div>user credentials</div>
          <Link href={`/admin/${USERID}`} className="bg-black text-white">
            detail User
          </Link>
        </div>
        <div className="flex gap-10 py-2">
          <div>user name</div>
          <div>user phone number</div>
          <div>user email</div>
          <div>user address</div>
          <div>user credentials</div>
          <Link href={`/admin/${USERID}`} className="bg-black text-white">
            detail User
          </Link>
        </div>
      </div>
    </div>
  );
}
