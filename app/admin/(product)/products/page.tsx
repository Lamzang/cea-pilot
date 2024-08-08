import Link from "next/link";

export default function AdminProducts() {
  return (
    <div className="p-5">
      <div className="border p-4 mb-5 rounded">
        <div className="text-xl font-semibold mb-2">
          Latest Month Product Graph
        </div>
        <div className="mb-2">Sells Graph</div>
        <div className="mb-2">Income Graph</div>
        <div className="mb-2">Category Histogram</div>
      </div>
      <div className="border p-4 mb-5 rounded">
        <div className="text-xl font-semibold mb-2">Total Product Graph</div>
        <div className="mb-2">Sells Graph</div>
        <div className="mb-2">Income Graph</div>
        <div className="mb-2">Category Histogram</div>
      </div>
      <div className="text-blue-500 cursor-pointer hover:underline mb-4">
        View All Products
      </div>
      <div className="ml-5">
        <div className="text-xl font-semibold mb-2">
          Latest Ordered Products
        </div>
        <div className="flex gap-5 py-2 mb-4 bg-gray-100 p-2 rounded">
          <div className="w-40 font-semibold">Product Name</div>
          <div className="w-40 font-semibold">Product Category</div>
          <div className="w-40 font-semibold">Product Price</div>
          <div className="w-40 font-semibold">Product Quantity</div>
          <div className="w-40 font-semibold">Product Total Price</div>
          <Link
            href="/admin/products/hello"
            className="bg-black text-white px-3 py-2 rounded"
          >
            Edit Products Info
          </Link>
        </div>
        <div className="text-blue-500 cursor-pointer hover:underline">
          View 10 More Products
        </div>
      </div>
    </div>
  );
}
