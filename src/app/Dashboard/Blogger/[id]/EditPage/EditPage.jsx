"use client";
import { updateBlogger } from "@/lib/action";
import Image from "next/image";
import React, { useReducer, useEffect } from "react";
import axios from "axios";
import { category as categories } from "../../../../../../data";
import dynamic from 'next/dynamic';
import { EditReducer, INIT_DATA } from "./EditReducer";

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const EditBlogPost = ({ id, post }) => {
  const [state, dispatch] = useReducer(EditReducer, INIT_DATA);

  useEffect(() => {
    dispatch({ type: 'INIT_POST', post });
  }, [post]);

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.title || !state.category || !state.desc || !state.bloggerContent) {
      console.error("Please fill all required fields");
      return;
    }

    const data = {
      id,
      ...state
    };

    console.log("Data being sent:", data);
    console.log("bloggerContent:", state.bloggerContent);

    try {
      const result = await updateBlogger(data);
      console.log("Blog post updated successfully", result);
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const handleFileUpload = async (event, field) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/di2do9rhy/image/upload",
        formData
      );
      handleChange(field, response.data.secure_url);
    } catch (error) {
      console.error("Error uploading the image", error);
    }
  };

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={state.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Title..."
          />
        </div>
        <div className="flex justify-between">
          <select
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            name="category"
            value={state.category}
            onChange={(e) => handleChange('category', e.target.value)}
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
            type="file"
            name="img"
            onChange={(e) => handleFileUpload(e, 'img')}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {state.img && (
            <div className="relative w-44 h-44">
              <Image
                fill
                src={state.img}
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
            type="file"
            name="imgDetalis"
            onChange={(e) => handleFileUpload(e, 'imgDetalis')}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {state.imgDetalis && (
            <div className="relative w-full h-72">
              <Image
                fill
                src={state.imgDetalis}
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
            value={state.desc}
            onChange={(e) => handleChange('desc', e.target.value)}
            className="mt-1 block w-full p-5 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Description..."
            rows="6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Blogger Content
          </label>
          <Editor
            apiKey='736r15xzjx2z3hr34cnzloo4oimelqjqqdx06pp9lxd8mbma'
            init={{
              // ... (your existing configuration)
            }}
            value={state.bloggerContent}
            onEditorChange={(content) => handleChange('bloggerContent', content)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Blog Post
        </button>
      </form>
    </div>
  );
};

export default EditBlogPost;