import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="p-5">
      <div className="text-2xl font-bold mb-4">Dashboard Home</div>
      <div className="mb-8">
        <div className="text-xl font-semibold mb-2">User Graph</div>
        <div className="ml-4 flex justify-between px-20 border m-2 rounded-2xl my-5 py-2">
          <div className=" hover:bg-slate-200 px-3 rounded-full cursor-pointer">
            graph of users
          </div>
          <div className="hover:bg-slate-200 px-3 rounded-full cursor-pointer">
            graph of users by month
          </div>
          <div className="hover:bg-slate-200 px-3 rounded-full cursor-pointer">
            Graph by Google Analytics
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="text-xl font-semibold mb-2">Product Graph</div>
        <div className="ml-4 flex justify-between px-20 border m-2 rounded-2xl my-5 py-2">
          <div className=" hover:bg-slate-200 px-3 rounded-full cursor-pointer">
            Graph of sales
          </div>
          <div className="hover:bg-slate-200 px-3 rounded-full cursor-pointer">
            Graph of total orders
          </div>
          <div className="hover:bg-slate-200 px-3 rounded-full cursor-pointer">
            Graph by Google Analytics
          </div>
        </div>
      </div>
      <div className="border p-5">
        <div className="text-xl font-semibold mb-4">Latest Reviews</div>
        <div className="flex gap-5 mb-4">
          <div className="w-80 border p-2">Product</div>
          <div className="w-60 border p-2">Customer</div>
          <div className="w-24 border p-2">Stars</div>
          <div className="w-full flex-grow border p-2">Review</div>
          <div className="w-60 border p-2">Credentials</div>
          <div className="w-60 border p-2">Time</div>
        </div>
        {/* <div className="mb-4">
          <div className="flex gap-5 mb-2">
            <Link
              className="w-80 border p-2 block"
              href={"/admin/products/summer-vacation"}
            >
              Summer Workshop
            </Link>
            <Link className="w-60 border p-2 block" href={"/admin/Jane"}>
              Jane
            </Link>
            <div className="w-24 border p-2">2.5</div>
            <div className="w-full flex-grow border p-2">
              Too hot to do workshop
            </div>
            <div className="w-60 border p-2">Basic</div>
            <div className="w-60 border p-2">Just now</div>
          </div>
          <div className="flex mb-2">
            <div className="w-32">Your reply:</div>
            <input className="flex-grow border p-2" value="sorry" />
            <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
              Edit
            </button>
            <button className="ml-2 px-3 py-1 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
          <form className="flex">
            <div className="w-32">New reply:</div>
            <input
              type="text"
              placeholder="Write reply"
              className="flex-grow border p-2"
            />
            <button className="ml-2 px-3 py-1 bg-green-500 text-white rounded">
              Send
            </button>
          </form>
        </div> */}
        {/* <div className="mb-4">
          <div className="flex gap-5 mb-2">
            <Link className="w-80 border p-2 block" href={"/admin/products/tb"}>
              Textbook for CBE
            </Link>
            <Link className="w-60 border p-2 block" href={"/admin/Alley"}>
              Alley
            </Link>
            <div className="w-24 border p-2">4.5</div>
            <div className="w-full flex-grow border p-2">
              Wonderful book I have ever seen
            </div>
            <div className="w-60 border p-2">Pro</div>
            <div className="w-60 border p-2">3 months ago</div>
          </div>
          <div className="flex mb-2">
            <div className="w-32">Your reply:</div>
            <input className="flex-grow border p-2" value="nice" />
            <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
              Edit
            </button>
            <button className="ml-2 px-3 py-1 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
          <form className="flex">
            <div className="w-32">New reply:</div>
            <input
              type="text"
              placeholder="Write reply"
              className="flex-grow border p-2"
            />
            <button className="ml-2 px-3 py-1 bg-green-500 text-white rounded">
              Send
            </button>
          </form>
        </div> */}
        <div className="text-blue-500 cursor-pointer hover:underline">
          View 10 more reviews
        </div>
      </div>
    </div>
  );
}
