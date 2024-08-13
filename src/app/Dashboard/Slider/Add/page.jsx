"use client"
import { addSlide } from '@/lib/action';
import Image from 'next/image';
import React, { useReducer } from 'react';
import axios from 'axios';
import { AddReducer, INIT_DATA } from './AddReducer';
function AddSlidePage() {
  const [state,dispatch] = useReducer(AddReducer,INIT_DATA);


  const handleChange = (e) =>{
    const {name , value} = e.target
    dispatch({type : "SET_DATA" , payload : {name ,value}})

  }

  // Upload the image to Cloudinary
  const handleFileUpload = async (event, imageType) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/di2do9rhy/image/upload",
        formData
      );
      dispatch({ type: "SET_DATA", payload: { name: imageType, value: response.data.secure_url } });
    } catch (error) {
      console.error("Error uploading the image", error);
    }
  };

  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', state.title);
    formData.append('img', state.img);
    formData.append('imgMobile', state.imgMobile);


    await addSlide(formData);  // Send data to the server
  };

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form onSubmit={handleSubmit} className='form flex flex-col gap-y-3 justify-between'>
        <div className='flex justify-between'>
          <input
            className='w-full p-2 rounded bg-gray-800 text-white'
            type='text'
            name='title'
            placeholder='Title'
            required
            value={state.title}
            onChange={handleChange}
          />
            </div>
            <label htmlFor="img">Image</label>
          <input
            className='w-full p-2 rounded bg-gray-800 text-white'
            type='file'
            onChange={(e) => handleFileUpload(e, "img")}
            required
            name='img'
            id='img'
          />
        <div className='relative w-96 h-44'>
          {state.img && (
            <div className='mt-5'>
              <Image
                src={state.img}
                alt='Preview'
                fill
                className='w-full h-full absolute'
              />
            </div>
          )}
        </div>
        <label htmlFor="imgMobile"> Image Mobile</label>
        <input
            className='w-full p-2 rounded bg-gray-800 text-white'
            type='file'
            onChange={(e) => handleFileUpload(e, "imgMobile")}
            required
            name='imgMobile'
          />
        <div className='relative w-80 h-44'>
          {state.imgMobile && (
            <div className='mt-5'>
              <Image
                src={state.imgMobile}
                alt='Preview'
                fill
                className='w-full h-full absolute'
              />
            </div>
          )}
        </div>
        <button
          type='submit'
          className='w-full bg-blue-600 p-3 rounded text-white hover:bg-blue-500 mt-3'
        >
          Add Slide
        </button>
      </form>
    </div>
  );
}

export default AddSlidePage;
