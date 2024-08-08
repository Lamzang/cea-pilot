"use client";

import { db, storage } from "@/lib/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
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

export default function AdminNewProduct() {
  const [product, setProduct] = useState<IProduct>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    discount: 0,
    description: "",
    id: "",
  });

  const [imageFiles, setImageFiles] = useState<(File | null)[]>(
    Array(6).fill(null)
  );
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    Array(6).fill(null)
  );
  const [dropZoneActive, setDropZoneActive] = useState(false);

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.type === "file") {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        const updatedFiles = [...imageFiles];
        const updatedPreviews = [...imagePreviews];
        updatedFiles[index] = file;
        updatedPreviews[index] = URL.createObjectURL(file);
        setImageFiles(updatedFiles);
        setImagePreviews(updatedPreviews);
      }
    } else {
      setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const uploadImage = async (file: File | null, imagePath: string) => {
    if (!file) return "";
    const storageRef = ref(storage, imagePath);
    await uploadBytes(storageRef, file);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await setDoc(doc(db, "products", product.id), {
        ...product,
      });
      await Promise.all(
        imageFiles.map(async (file, index) => {
          if (file) {
            const imagePath = `/images/${product.id}/${
              index === 0
                ? "title"
                : index === 5
                ? "description"
                : `subtitle${index}`
            }`;
            await uploadImage(file, imagePath);
          }
        })
      );

      alert("Product created successfully!");
      setProduct({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        discount: 0,
        description: "",
        id: "",
      });
      setImageFiles(Array(6).fill(null));
      setImagePreviews(Array(6).fill(null));
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropZoneActive(true);
  };

  const handleDragLeave = () => {
    setDropZoneActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDropZoneActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const updatedFiles = [...imageFiles];
      const updatedPreviews = [...imagePreviews];
      updatedFiles[index] = file;
      updatedPreviews[index] = URL.createObjectURL(file);
      setImageFiles(updatedFiles);
      setImagePreviews(updatedPreviews);
    }
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
              onChange={(e) => onChange(e, -1)}
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
              onChange={(e) => onChange(e, -1)}
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
              onChange={(e) => onChange(e, -1)}
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
              onChange={(e) => onChange(e, -1)}
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
              onChange={(e) => onChange(e, -1)}
              value={product.description}
            />
          </div>
          <div
            className="border-2 border-dashed p-4 rounded-lg"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 0)}
          >
            <label className="block text-sm font-medium" htmlFor="titleImage">
              Drag & Drop Title Image Here or Click to Upload
            </label>
            <input
              type="file"
              id="titleImage"
              accept="image/*"
              className="mt-1 block w-full p-2 border rounded h-10"
              onChange={(e) => onChange(e, 0)}
              style={{ display: "none" }}
            />
            {imagePreviews[0] && (
              <img
                src={imagePreviews[0]}
                alt="Title Image preview"
                className="mt-2"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            )}
          </div>
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="border-2 border-dashed p-4 rounded-lg"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
            >
              <label
                className="block text-sm font-medium"
                htmlFor={`subtitleImage${index}`}
              >
                Drag & Drop Subtitle Image {index} Here or Click to Upload
              </label>
              <input
                type="file"
                id={`subtitleImage${index}`}
                accept="image/*"
                className="mt-1 block w-full p-2 border rounded h-10"
                onChange={(e) => onChange(e, index)}
                style={{ display: "none" }}
              />
              {imagePreviews[index] && (
                <img
                  src={imagePreviews[index]}
                  alt={`Subtitle Image ${index} preview`}
                  className="mt-2"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          ))}
          <div
            className="border-2 border-dashed p-4 rounded-lg"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 5)}
          >
            <label
              className="block text-sm font-medium"
              htmlFor="descriptionImage"
            >
              Drag & Drop Description Image Here or Click to Upload
            </label>
            <input
              type="file"
              id="descriptionImage"
              accept="image/*"
              className="mt-1 block w-full p-2 border rounded h-10"
              onChange={(e) => onChange(e, 5)}
              style={{ display: "none" }}
            />
            {imagePreviews[5] && (
              <img
                src={imagePreviews[5]}
                alt="Description Image preview"
                className="mt-2"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            )}
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
