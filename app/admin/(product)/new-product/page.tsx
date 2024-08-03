"use client";

import { db } from "@/lib/firebase/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface IProduct {
  name: string;
  category: string;
  price: number;
  stock: number;
  discount: number;
  description: string;
  id: string;
}

export default function adminNewProduct() {
  const [product, setProduct] = useState<IProduct>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    discount: 0,
    description: "",
    id: "",
  });
  useEffect(() => {
    const compositedName = product.name
      .split(" ")
      .join("")
      .toLowerCase()
      .substring(0, 15);
    const randomNum = String(
      Math.floor(Math.random() * 10 ** (19 - compositedName.length))
    ).padStart(19 - compositedName.length, "0");
    const newId = compositedName + "-" + randomNum;
    setProduct((prev) => ({ ...prev, id: newId }));
  }, [product.name]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDoc(doc(db, "products", product.id), product);
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
              required
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
              required
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
              required
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
              required
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
