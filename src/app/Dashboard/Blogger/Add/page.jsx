"use client";

import { addBlogger } from "@/lib/action";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { category as categories } from "../../../../../data";
import dynamic from 'next/dynamic';

// استيراد المكون بشكل ديناميكي
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
  ssr: false, // تعطيل التصيير على جانب الخادم
  loading: () => <p>Loading editor...</p>,
});

const AddBlogPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [imgDetalis, setImgDetalis] = useState("");
  const [desc, setDesc] = useState("");
  const [bloggerContent, setBloggerContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !desc || !bloggerContent) {
      console.error("Please fill all required fields");
      return;
    }

    const data = {
      title,
      category,
      img,
      imgDetalis,
      desc,
      bloggerContent,
    };

    console.log("Data being sent:", data);
    console.log("bloggerContent:", bloggerContent);

    try {
      const result = await addBlogger(data);
      console.log("Blog post added successfully", result);
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const handleFileUpload = async (event, setImageUrl) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/di2do9rhy/image/upload",
        formData
      );
      setImageUrl(response.data.secure_url);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Title..."
          />
        </div>
        <div className="flex justify-between">
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
            type="file"
            name="img"
            onChange={(e) => handleFileUpload(e, setImg)}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {img && (
            <div className="relative w-44 h-44">
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
            type="file"
            name="imgDetalis"
            onChange={(e) => handleFileUpload(e, setImgDetalis)}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Blogger Content
          </label>
          <Editor
            apiKey='736r15xzjx2z3hr34cnzloo4oimelqjqqdx06pp9lxd8mbma'
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
            }}
            value={bloggerContent}
            onEditorChange={(content) => setBloggerContent(content)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Blog Post
        </button>
      </form>
    </div>
  );
};

export default AddBlogPost;