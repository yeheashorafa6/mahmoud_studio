"use client";
import React, { useState } from "react";
import { addBlogger } from "@/lib/action";
import { category as categories } from "../../../../../data";
import Image from "next/image";
const AddBlogPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [imgDetalis, setImgDetalis] = useState("");
  const [desc, setDesc] = useState("");
  const [sections, setSections] = useState([]);

  const addSection = (type) => {
    setSections([...sections, { type, content: "" }]);
  };

  const handleSectionChange = (index, content) => {
    const newSections = [...sections];
    newSections[index].content = content;
    setSections(newSections);
  };

  const handleSubmit = async () => {
    const data = {
      title,
      category,
      img,
      imgDetalis,
      desc,
      sections,
    };

    try {
      await addBlogger(data);
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form action={handleSubmit} className="flex flex-col gap-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Title..."
          />
        </div>
        <div className="flex justify-betwee">
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
        </div>
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
            <div className="relative w-full h-72">
            <Image
           fill
             src={img}
             alt="Image Preview"
             className="mt-2 w-full h-full absolute rounded-md"
           />
          </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Image Details URL
          </label>
          <input
            type="text"
            name="imgDetalis"
            value={imgDetalis}
            onChange={(e) => setImgDetalis(e.target.value)}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Image Details URL..."
          />
          {imgDetalis && (
           <div className="relative w-full h-72">
             <Image
            fill
              src={imgDetalis}
              alt="Image Details Preview"
              className="mt-2 w-full h-full absolute rounded-md"
            />
           </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 block w-full p-5 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Description..."
            rows="6"
          />
        </div>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-300">
                {section.type === "title" ? "Title" : "Description"}
              </label>
              {section.type === "text" ? (
                <textarea
                  name={`section-${index}-content`}
                  value={section.content}
                  onChange={(e) => handleSectionChange(index, e.target.value)}
                  className="mt-1 block w-full p-5 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Text..."
                  rows="6"
                />
              ) : (
                <input
                  type="text"
                  name={`section-${index}-content`}
                  value={section.content}
                  onChange={(e) => handleSectionChange(index, e.target.value)}
                  className="mt-1 block w-full p-5 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Title..."
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => addSection("title")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Title
          </button>
          <button
            type="button"
            onClick={() => addSection("text")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Description
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPost;
