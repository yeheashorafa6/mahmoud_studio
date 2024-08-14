"use client";
import React, { useRef, useReducer } from "react";
import axios from "axios";
import Image from "next/image";
import { addCoustome } from "@/lib/action";
import { AddCoustomReducer, INIT_DATA } from "./AddCoustomReducer";

function AddOurCustomersPage() {
  const [state,dispatch] = useReducer(AddCoustomReducer,INIT_DATA);
  const fileInputRef = useRef(null);

  const handleChange = (e)=>{
    const {name, value} = e.target
    dispatch({type : "SET_DATA" , payload : {name, value}})
  }

  // Upload the image to Cloudinary
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'upload_preset'); // Replace with your upload preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/image/upload', formData);
        dispatch({type : "SET_IMAGE" , payload : response.data.secure_url})        
      } catch (error) {
        console.error('Error uploading the image', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', state.title);
    formData.append('link', state.link);
    formData.append('img', state.img);

    await addCoustome(formData); // Send data to the server
  };
  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form
        onSubmit={handleSubmit}
        className="form flex flex-col gap-y-3 justify-between"
      >
        <div className="flex justify-between">
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            type="text"
            name="title"
            placeholder="Title"
            required
            value={state.title}
          onChange={handleChange}
          />
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            type="text"
            name="link"
            placeholder="Link"
            value={state.link}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className='text-white mb-1' htmlFor='img'>Image</label>
          <input
          className='w-full p-2 rounded bg-gray-800 text-white'
          type='file'
          onChange={handleFileUpload}
          required
          name='img'
        />
        <div className='relative w-80 h-80'>
          {state.img && (
            <div className='mt-2'>
              <Image
                src={state.img}
                alt={state.title}
                fill
                className='w-full h-full absolute rounded-md'
              />
            </div>
          )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 p-3 rounded text-white hover:bg-blue-500 mt-3"
        >
          Add Coustom
        </button>
      </form>
    </div>
  );
}

export default AddOurCustomersPage;
