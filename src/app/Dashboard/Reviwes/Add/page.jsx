"use client";
import React, { useReducer, useState } from "react";
import axios from "axios";
import { addReviwes } from "@/lib/action";
import Image from "next/image";
import { AddReviweReducer, INIT_DATA } from "./AddReviweReducer";

function AddReviwesPage() {
  const [state,dispatch] = useReducer(AddReviweReducer,INIT_DATA)


  const handleChange = (e) => {
    const {name , value} = e.target
    dispatch({type: "SET_DATA" , payload : {name , value}})
  }

  // Upload the image to Cloudinary
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload_preset'); // Replace with your upload preset

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/image/upload', formData);
      dispatch({type : "SET_IMAGE" , payload : response.data.secure_url})
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', state.username);
    formData.append('job', state.job);
    formData.append('desc', state.desc);
    formData.append('img', state.img);

    await addReviwes(formData); // Send data to the server
  };


  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form onSubmit={handleSubmit} className="form flex flex-col gap-y-3 justify-between">
        <div className="flex justify-between">
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            name="username"
            type="text"
            placeholder="Username..."
            value={state.username}
            onChange={handleChange}
            required
          />
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            name="job"
            type="text"
            placeholder="Job..."
            value={state.job}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          className="w-full p-2 rounded bg-gray-800 text-white"
          name="desc"
          placeholder="Description..."
          rows="5"
          value={state.desc}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          type="file"
          onChange={handleFileUpload}
          required
        />
        <div className="relative w-20 h-20 mt-5">
          {state.img && (
            <Image
              src={state.img}
              alt="Preview"
              fill
              className="absolute w-full h-full object-cover rounded-full"
            />
          )}
        </div>
        <button
          type="submit"
          className="self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Reviwes 
        </button>
      </form>
    </div>
  );
}

export default AddReviwesPage;
