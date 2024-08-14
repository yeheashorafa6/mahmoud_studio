"use client";
import { addAudios } from "@/lib/action";
import React, { useReducer, useState } from "react";
import axios from "axios";
import { AddAudioReducer, INIT_DATA } from "./AddAudioReducer";

function AddAudioPage() {

  const [state , dispatch] = useReducer(AddAudioReducer,INIT_DATA)
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    audio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({type : "SET_DATA" , payload  : {name , value}})
  };

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload_audio'); // استخدم اسم الـ upload_preset الخاص بك
    formData.append('folder', 'studio/audio'); // تحديد المجلد الذي سيتم الرفع إليه

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/di2do9rhy/auto/upload', 
        formData
      );
      dispatch({type : "SET_AUDIO" , payload : response.data.secure_url})
    } catch (error) {
      console.error('Error uploading the audio', error);
    }
  };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('title', state.title);
      formData.append('tag', state.tag);
      formData.append('audio', state.audio);
  
  
      await addAudios(formData);  // Send data to the server
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
            name="title"
            type="text"
            placeholder="Title..."
            value={state.title}
            onChange={handleChange}
          />
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            name="tag"
            type="text"
            placeholder="Tag..."
            value={state.tag}
            onChange={handleChange}
          />
        </div>
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          type="file"
          onChange={handleAudioUpload}
          accept="audio/*"
          name="audio"
        />
        <input
          type="hidden"
          name="audio"
          value={state.audio}
        />
        <div className="relative">
          {state.audio && (
            <div className="mt-5">
              <audio controls className="w-full">
                <source src={state.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
        <button type="submit" className="self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Add Audio
        </button>
      </form>
    </div>
  );
}

export default AddAudioPage;