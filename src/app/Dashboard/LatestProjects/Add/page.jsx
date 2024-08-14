"use client";
import React, { useReducer, useState } from "react";
import { category } from "../../../../../data";
import Image from "next/image";
import axios from "axios";
import { addLatestProject } from "@/lib/action";
import { AddLatestProjectsReducer, INIT_DATA } from "./AddLatestProjectsReducer";

function AddLatestProjectPage() {
  const [state , dispatch] = useReducer(AddLatestProjectsReducer,INIT_DATA)

  const handleChange=(e)=>{
    const {name , value} = e.target
    dispatch({type:"SET_DATA",payload : {name , value}})
  }

  // Upload the image to Cloudinary
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload_preset'); // استبدل بـ upload preset الخاص بك

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/image/upload', formData);
      dispatch({type:"SET_IMAGE_URL",payload :response.data.secure_url })
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', state.title);
    formData.append('category', state.category);
    formData.append('img', state.imageUrl);
    formData.append('desc', state.desc);

    await addLatestProject(formData); // إرسال البيانات إلى السيرفر
  };


  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form action={handleSubmit} className='form flex flex-col gap-y-3 justify-between'>
        <div className='flex justify-between'>
          <input
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            type='text'
            name='title'
            placeholder='Title...'
            required
            value={state.title}
            onChange={handleChange}
          />
          <select
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            name='category'
            required
            value={state.category}
            onChange={handleChange}
          >
            <option value="">Choose Your Category</option>
            {category.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <input
          className='w-[45%] p-2 rounded bg-gray-800 text-white'
          type='file'
          onChange={handleFileUpload}
          required
          name='img'
        />
        <div className='relative w-96 h-44'>
          {state.imageUrl && (
            <div className='mt-5'>
              <Image
                src={state.imageUrl}
                alt='Preview'
                fill
                className='w-full h-full absolute'
              />
            </div>
          )}
        </div>
        <textarea
          className='w-full p-2 rounded bg-gray-800 text-white'
          placeholder='Description...'
          name='desc'
          rows='11'
          required
          value={state.desc}
          onChange={handleChange}
        ></textarea>
        <button
          type='submit'
          className='w-full bg-blue-600 p-3 rounded text-white hover:bg-blue-500 mt-3'
        >
          Add Project
        </button>
      </form>
    </div>
  );
}

export default AddLatestProjectPage;
