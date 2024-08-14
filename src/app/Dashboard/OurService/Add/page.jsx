"use client";
import React, { useReducer, useState } from "react";
import { category as categories } from "../../../../../data";
import { addService } from "@/lib/action";
import axios from "axios";
import Image from "next/image";
import { AddServiceReducer, INIT_DATA } from "./AddServiceReducer";

function AddServicePage() {
  const [state,dispatch] = useReducer(AddServiceReducer,INIT_DATA);

  const handleChange = (e)=>{
    const {name , value} = e.target
    dispatch({type : "SET_DATA", payload : { name, value}})
  }

  // Upload the image to Cloudinary
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload_preset'); // Replace with your upload preset

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/image/upload', formData);
      dispatch({type : "SET_IMAGE" ,payload : response.data.secure_url})
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', state.category);
    formData.append('desc', state.desc);
    formData.append('img', state.img);

    await addService(formData); // Send data to the server
  };

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form onSubmit={handleSubmit} className='form flex flex-col gap-y-3 justify-between'>
        <select
          className='w-full p-2 rounded bg-gray-800 text-white'
          name='category'
          value={state.category}
          onChange={handleChange}
        >
          <option value="general">Choose Your Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <textarea
          className='w-full p-2 rounded bg-gray-800 text-white'
          name='desc'
          placeholder='Description...'
          rows='5'
          value={state.desc}
          onChange={handleChange}
        ></textarea>
        <input
          className='w-full p-2 rounded bg-gray-800 text-white'
          type='file'
          onChange={handleFileUpload}
          required
          name='img'
        />
        <div className='relative w-24 h-24'>
          {state.img && (
            <div className='mt-2'>
              <Image
                src={state.img}
                alt={state.category}
                fill
                className='w-full h-full absolute rounded-md'
              />
            </div>
          )}
        </div>
        <button
          type='submit'
          className='w-full bg-blue-600 p-3 rounded text-white hover:bg-blue-500 mt-3'
        >
          Add Service
        </button>
      </form>
    </div>
  );
}

export default AddServicePage;
