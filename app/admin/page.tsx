import Link from "next/link";

export default function adminPage() {
  return (
    <div>
      <div>Dash board Home</div>
      <div>
        <div>User Graph</div>
        <div>graph of new users</div>
        <div>graph of total users</div>
        <div>graph by google analytics</div>
      </div>
      <div>
        <div>Product Graph</div>
        <div>graph of sells</div>
        <div>graph of total orders</div>
        <div>graph by google analytics</div>
      </div>
      <div className=" border mr-20 ml-5">
        <div>Latest Reviews</div>
        <div className="flex gap-5 ">
          <div className="w-80 border">product</div>
          <div className="w-60 border">customer</div>
          <div className="w-24 border">stars</div>
          <div className="w-full border">review</div>
          <div className="w-60 border">credentials</div>
          <div className="w-60 border">time</div>
        </div>
        <div>
          <div className="flex gap-5 ">
            <Link
              href={"/admin/products/summer-vacation"}
              className="w-80 border"
            >
              Summer workshop
            </Link>
            <Link href={"/admin/Jane"} className="w-60 border">
              Jane
            </Link>
            <div className="w-24 border">2.5</div>
            <div className="w-full border">too hot to do workshop</div>
            <div className="w-60 border">Basic</div>
            <div className="w-60 border">Just now</div>
          </div>
          <div className="flex">
            <div className="w-32">your reply : </div>
            <input className="w-full" value={"sorry"} />
            <div>Edit</div>
            <div>Delete</div>
          </div>

          <form className="flex">
            <div className="w-32">new reply : </div>
            <input type="text" placeholder="write reply" className="w-full" />
            <button>Send</button>
          </form>
        </div>
        <div>
          <div className="flex gap-5 ">
            <Link href={"/admin/products/tb"} className="w-80 border">
              Textbook for CBE
            </Link>
            <Link href={"/admin/Alley"} className="w-60 border">
              Alley
            </Link>
            <div className="w-24 border">4.5</div>
            <div className="w-full border">wonderful book I have ever seen</div>
            <div className="w-60 border">Pro</div>
            <div className="w-60 border">3 months ago</div>
          </div>
          <div className="flex">
            <div className="w-32">your reply : </div>
            <input className="w-full" value={"nice"} />
            <div>Edit</div>
            <div>Delete</div>
          </div>

          <form className="flex">
            <div className="w-32">new reply : </div>
            <input type="text" placeholder="write reply" className="w-full" />
            <button>Send</button>
          </form>
        </div>
        <div>view 10 more reviews</div>
      </div>
    </div>
  );
}
