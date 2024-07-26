import Link from "next/link";

export default function AdminProducts() {
  return (
    <div>
      <div className="border">
        <div>Latest Month Product graph</div>
        <div>sells graph</div>
        <div>income graph</div>
        <div>category histogram</div>
      </div>
      <div className="border">
        <div>Total Product graph</div>
        <div>sells graph</div>
        <div>income graph</div>
        <div>category histogram</div>
      </div>
      <div>view all products</div>
      <div className="ml-5">
        <div>Latest ordered products</div>
        <div className="flex gap-5 py-2">
          <div>product name</div>
          <div>product category</div>
          <div>product price</div>
          <div>product quantity</div>
          <div>product total price</div>
          <Link className="bg-black text-white" href={"/admin/products/hello"}>
            Edit Products Info
          </Link>
        </div>
        <div className="flex gap-5 py-2">
          <div>product name</div>
          <div>product category</div>
          <div>product price</div>
          <div>product quantity</div>
          <div>product total price</div>
          <Link className="bg-black text-white" href={"/admin/products/hello"}>
            Edit Products Info
          </Link>
        </div>
        <div>view 10 more products</div>
      </div>
    </div>
  );
}
