"use client";
import React, { useState } from "react";
import { category as categories } from "../../../../../data";
import { addService } from "@/lib/action";
import Image from "next/image";
function AddServicePage() {
  const [category, setCategory] = useState("general");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");



  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form
        action={addService}
        className="form flex flex-col gap-y-3 justify-between"
      >
        <select
          className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">Choose Your Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <textarea
          className="w-full mt-3 p-3 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          name="desc"
          placeholder="Description..."
          rows="5"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
         <div>
          <label className="block text-sm font-medium text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            name="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Image URL..."
          />
          {img && (
            <div className="relative w-24 h-24">
            <Image
            fill
             src={img}
             alt="Image Preview"
             className="mt-2 w-full h-full absolute rounded-md"
           />
          </div>
          )}
        </div>
        <button className="self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add Service
        </button>
      </form>
    </div>
  );
}

export default AddServicePage;
