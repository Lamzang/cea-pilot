import Link from "next/link";

export default function AdminProductMap() {
  return (
    <div>
      <div>
        <div className="flex gap-5 justify-between">
          <div>order method</div>
          <Link href={"/admin/new-product"}>new product</Link>
          <button>export Excel</button>
        </div>
        <div className="flex gap-5 ">
          <div className="w-80 border">name</div>
          <div className="w-60 border">category</div>
          <div className="w-60 border">price</div>
          <div className="w-60 border">number reviews</div>
          <div className="w-60 border">stock</div>
          <div className="w-60 border">discount</div>
          <div className="w-60 border">latest sells time</div>
          <div>go to detail product data</div>
        </div>
        <div className="flex gap-5 ">
          <div className="w-80 border">Summer workshop</div>
          <div className="w-60 border">workshop</div>
          <div className="w-60 border">100_000</div>
          <div className="w-60 border">12</div>
          <div className="w-60 border">infinite</div>
          <div className="w-60 border">0</div>
          <div className="w-60 border">5 min ago</div>
          <Link href={"/admin/products/hello"}>go to detail product data</Link>
        </div>
        <div className="flex gap-5 ">
          <div className="w-80 border">textbook CBE</div>
          <div className="w-60 border">textbook</div>
          <div className="w-60 border">24_000</div>
          <div className="w-60 border">24</div>
          <div className="w-60 border">36</div>
          <div className="w-60 border">10000</div>
          <div className="w-60 border">3 months ago</div>
          <Link href={"/admin/products/hello"}>go to detail product data</Link>
        </div>
        <div>view 30 more data</div>
      </div>
    </div>
  );
}
