"use client";

import { db } from "@/lib/firebase/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, ChangeEvent } from "react";

interface IProductData {
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  discount: number;
  id: string;
}

const AdminProduct = ({ params }: { params: { product: string } }) => {
  const [productData, setProductData] = useState<IProductData | null>(null);
  const productId = decodeURIComponent(params.product);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProductData(docSnap.data() as IProductData);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [productId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (productData) {
      const { name, value } = e.target;
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "products", productId), productData);
      console.log("Saved product data", productData);
      alert("Product data saved successfully!");
    } catch (error) {
      console.error("Error saving product data", error);
      alert("Failed to save product data.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "products", productId));
      console.log("Deleted product data", productData);
      alert("Product deleted successfully!");
      router.push("/admin/product-map");
    } catch (error) {
      console.error("Error deleting product data", error);
      alert("Failed to delete product data.");
    }
  };

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleSave}
          className="self-end px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
        <div>
          <label className="block text-xl font-semibold mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-xl font-semibold mb-2" htmlFor="price">
            Product Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            placeholder="Product Price"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label
            className="block text-xl font-semibold mb-2"
            htmlFor="description"
          >
            Product Description
          </label>
          <input
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label
            className="block text-xl font-semibold mb-2"
            htmlFor="category"
          >
            Product Category
          </label>
          <input
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            placeholder="Product Category"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-xl font-semibold mb-2" htmlFor="stock">
            Product Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={productData.stock}
            onChange={handleChange}
            placeholder="Product Stock"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label
            className="block text-xl font-semibold mb-2"
            htmlFor="discount"
          >
            Product Discount
          </label>
          <input
            id="discount"
            name="discount"
            type="number"
            value={productData.discount}
            onChange={handleChange}
            placeholder="Product Discount"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleDelete}
          className="self-end px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProduct;
