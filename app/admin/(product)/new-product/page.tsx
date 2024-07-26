"use client";

import { db } from "@/lib/firebase/firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import next from "next";
import { useEffect, useState } from "react";

interface IProduct {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  reviews: string[];
  id: string;
}

export default function adminNewProduct() {
  const [product, setProduct] = useState<IProduct>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    reviews: [],
    id: "",
  });
  useEffect(() => {
    const newId =
      product.name.split(" ").join("") +
      Math.floor(1000 + Math.random() * 9000).toString();
    setProduct((prev) => ({ ...prev, id: newId }));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDoc(doc(db, "shopSimpleData", product.id), {
      name: product.name,
      price: product.price,
      id: product.id,
    });
    setDoc(doc(db, "shopDetailData", product.id), product);
    updateDoc(doc(db, "category", product.category), {
      productIdArray: arrayUnion(product.id),
    });
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="border p-5 rounded-lg shadow-lg min-w-96">
        <h2 className="text-xl font-semibold mb-4">New Product</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Product name"
              className="mt-1 block w-full p-2 border rounded"
              onChange={onChange}
              value={product.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              placeholder="Product category"
              className="mt-1 block w-full p-2 border rounded"
              onChange={onChange}
              value={product.category}
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Product price"
              className="mt-1 block w-full p-2 border rounded"
              onChange={onChange}
              value={product.price}
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="stock">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              placeholder="Product stock"
              className="mt-1 block w-full p-2 border rounded"
              onChange={onChange}
              value={product.stock}
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              className="mt-1 block w-full p-2 border rounded"
              onChange={onChange}
              value={product.description}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
