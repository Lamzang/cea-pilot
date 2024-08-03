"use client";

import { db } from "@/lib/firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
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
      getDoc(doc(db, "products", productId)).then((doc) => {
        if (doc.exists()) {
          setProductData(doc.data() as IProductData);
        }
        console.log(params.product);
      });
    };
    fetchData();
  }, [params.product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (productData) {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    // Implement save functionality here
    //maybe we have to use merge option
    console.log("Saved product data", productData);
    setDoc(doc(db, "products", productId), productData);
  };

  if (!productData) return <div>Maybe none</div>;
  const onDelete = () => {
    // Implement delete functionality here
    console.log("Deleted product data", productData);
    deleteDoc(doc(db, "products", productId));
    router.push("/admin/product-map");
  };

  return (
    <div className="flex flex-col">
      <button onClick={handleSave}>Save</button>
      <input
        name="name"
        value={productData.name}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <input
        name="price"
        type="number"
        value={productData.price}
        onChange={handleChange}
        placeholder="Product Price"
      />
      <input
        name="description"
        value={productData.description}
        onChange={handleChange}
        placeholder="Product Description"
      />
      <input
        name="category"
        value={productData.category}
        onChange={handleChange}
        placeholder="Product Category"
      />
      <input
        name="stock"
        type="number"
        value={productData.stock}
        onChange={handleChange}
        placeholder="Product Stock"
      />
      <input
        name="discount"
        type="number"
        value={productData.discount}
        onChange={handleChange}
        placeholder="Product Discount"
      />
      <div>
        <h3>Reviews</h3>
        {/* {productData.reviews.map((review, index) => (
          <div key={index} className="flex gap-5">
            <div>Customer</div>
            <div>{review}</div>
            <div>Stars</div>
            <div>Time</div>
          </div>
        ))} */}
      </div>
      <div onClick={onDelete} className="border cursor-grab">
        Delete
      </div>
    </div>
  );
};

export default AdminProduct;
